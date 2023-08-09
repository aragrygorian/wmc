import { useCreateMutation } from '@gravis-os/crud'
import { TextField } from '@gravis-os/fields'
import {
  ActionFooter,
  ACTION_FOOTER_PADDING,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import MoneyIcon from '@mui/icons-material/Money'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { InputAdornment } from '@mui/material'
import { Inventory as PrismaInventory } from '@prisma/client'
import { routes } from '@warehouse/app/routes'
import useUser from '@warehouse/app/useUser'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import inventoryModule from '@warehouse/modules/Inventory/inventoryModule'
import PurchaseOrderLineCardList from '@warehouse/modules/PurchaseOrder/components/PurchaseOrderLineCardList'
import useGetPurchaseOrderDetails from '@warehouse/modules/PurchaseOrder/hooks/useGetPurchaseOrderDetails'
import purchaseOrderModule from '@warehouse/modules/PurchaseOrder/purchaseOrderModule'
import {
  PurchaseOrderLineStatus,
  PurchaseOrderStatus,
} from '@warehouse/modules/PurchaseOrder/utils/constants'
import {
  PurchaseOrder,
  PurchaseOrderLine,
} from '@warehouse/modules/PurchaseOrder/utils/types'
import updatePurchaseOrderStatus from '@warehouse/modules/PurchaseOrder/utils/updatePurchaseOrderStatus'
import {
  filter,
  find,
  isEmpty,
  isEqual,
  isNil,
  isUndefined,
  map,
  size,
  some,
} from 'lodash'
import { NextPage } from 'next'
import Router from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import useGetSupplierReferenceNo from '../../../src/modules/Inventory/hooks/useGetSupplierReferenceNo'

interface PurchaseOrderTableItem {
  title: string
  description: string
}

const createPurchaseOrderTableItems = (
  purchaseOrder?: PurchaseOrder | null
): PurchaseOrderTableItem[] => {
  const { title, company } = purchaseOrder || {}
  const { title: companyTitle } = company || {}
  return [
    { title: 'Purchase Order No.', description: title ?? '-' },
    { title: 'Supplier', description: companyTitle ?? '-' },
  ]
}

const PurchaseOrderDetailPage: NextPage = () => {
  /* Data */
  const purchaseOrder = useGetPurchaseOrderDetails()
  const { slug, status } = purchaseOrder || {}
  const isGoodsReceived = isEqual(status, PurchaseOrderStatus.GoodsReceived)

  /* Lines */
  const [lines, setLines] = useState<PurchaseOrderLine[]>([])
  useEffect(() => setLines(purchaseOrder?.lines ?? []), [purchaseOrder])
  const fetchedSupplierReferenceNo = useGetSupplierReferenceNo(
    find(lines, Boolean)?.id
  )

  /* Supplier Reference No. */
  const [supplierReferenceNo, setSupplierReferenceNo] = useState('')
  useEffect(() => {
    if (!isNil(fetchedSupplierReferenceNo)) {
      setSupplierReferenceNo(fetchedSupplierReferenceNo)
    }
  }, [fetchedSupplierReferenceNo])
  const onSupplierReferenceNoChange = (e: ChangeEvent) => {
    setSupplierReferenceNo((e.target as HTMLInputElement).value)
  }

  /* Submit */
  const queryClient = useQueryClient()
  const { user } = useUser()
  const { createMutation: createInventoryMutation } =
    useCreateMutation<PrismaInventory>({
      module: inventoryModule,
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries([purchaseOrderModule.table.name, slug])
        },
      },
    })
  const handleSubmit = async () => {
    try {
      /* Validate */
      const receivingLines = filter(
        lines,
        (line) =>
          !isUndefined(line.receiving_quantity) &&
          isEqual(line.quantity, line.receiving_quantity)
      )

      // If there are no lines changed, throw error
      if (isEmpty(receivingLines)) {
        throw new Error('No changes applied to the products')
      }

      // If the supplier reference number is left to empty, throw error
      if (isEmpty(supplierReferenceNo)) {
        throw new Error('Please enter Supplier Reference No.')
      }

      /* Update Lines */
      const responses = await Promise.all(
        map(receivingLines, async (line) => {
          const {
            id,
            purchase_order: { warehouse_id: warehouseId },
            product_id: productId,
            receiving_quantity: receivingQuantity,
          } = line
          return createInventoryMutation.mutateAsync({
            in: receivingQuantity,
            ref_no: supplierReferenceNo,
            warehouse_id: warehouseId,
            product_id: productId,
            purchase_order_line_id: id,
            created_by: user?.id,
            updated_by: user?.id,
          })
        })
      )
      // Check for error
      if (some(responses, (response) => Boolean(response.error))) {
        throw new Error('Error updating purchase order line values.')
      }
      queryClient.invalidateQueries()

      if (isNil(purchaseOrder)) {
        throw new Error('Invalid purchase order selected.')
      }

      /* Update Purchase Order */
      const { error } = await updatePurchaseOrderStatus(
        PurchaseOrderStatus.GoodsReceived,
        purchaseOrder.id
      )
      if (error) {
        throw new Error('Error updating purchase order status.')
      }

      // All correct, redirect
      Router.push(`${routes.PURCHASE_ORDER_LANDING_PAGE}/${slug}`)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <DashboardLayout>
      <Box pb={ACTION_FOOTER_PADDING}>
        {/* Main Information */}
        <Card
          disableLastGutterBottom
          disableBorderRadiusBottom
          disableBorderRadiusTop
          sx={{ backgroundColor: 'primary.dark' }}
        >
          {/* Title */}
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1} direction="row" color="primary.contrastText">
              <MoneyIcon />
              <Typography variant="h4" color="primary.contrastText">
                Receive Purchase Order
              </Typography>
            </Stack>
            {/* Number of completed lines / Total lines */}
            <Typography variant="h4" color="primary.contrastText">
              {size(
                filter(lines, (line) =>
                  isEqual(line.status, PurchaseOrderLineStatus.Received)
                )
              )}
              /{size(lines)}
            </Typography>
          </Stack>
          {/* Information */}
          {map(createPurchaseOrderTableItems(purchaseOrder), (item) => (
            <Grid container sx={{ mt: 2 }} key={`table-item-${item.title}`}>
              <Grid item xs={5}>
                <Typography variant="body2" color="primary.contrastText">
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle2" color="primary.contrastText">
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Card>
        {/* Main Stack */}
        <Stack p={2} spacing={2}>
          {/* Search Bar */}
          <TextField
            placeholder="Search Items"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <QrCodeScannerIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* List of lines */}
          {/* This purchase order already contains a Stack with spacing 1 */}
          <PurchaseOrderLineCardList lines={lines ?? []} />
          {/* Supplier Reference Number */}
          <TextField
            label="Supplier Reference No."
            placeholder="Add Supplier Reference No."
            value={supplierReferenceNo}
            onChange={onSupplierReferenceNoChange}
            disabled={isGoodsReceived}
          />
        </Stack>
      </Box>
      <ActionFooter
        actions={[
          <Button
            variant={isGoodsReceived ? 'muted' : 'contained'}
            fullWidth
            onClick={isGoodsReceived ? Router.back : handleSubmit}
          >
            {isGoodsReceived ? 'BACK' : 'MARK AS GOODS RECEIVED'}
          </Button>,
        ]}
      />
    </DashboardLayout>
  )
}

export default PurchaseOrderDetailPage
