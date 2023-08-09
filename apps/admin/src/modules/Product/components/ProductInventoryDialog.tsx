import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { StorageAvatar } from '@gravis-os/storage'
import { alpha, useTheme } from '@mui/material/styles'
import { Add, Remove } from '@mui/icons-material'
import { NumberField } from '@gravis-os/fields'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import { useCreateMutation } from '@gravis-os/crud'
import useUser from '@admin/app/useUser'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { WAREHOUSE_STATUS_CONFIG } from '@admin/modules/Warehouse/constants'
import { WarehouseProduct } from '../../Warehouse/types'
import { getWarehouseProductStatus } from '../../Warehouse/utils/getWarehouseProductStatus'
import { getInstock } from '../../Inventory/utils/getInstock'
import inventoryModule from '../../Inventory/inventoryModule'

interface ProductInventoryDialogProps extends Omit<DialogProps, 'onClose'> {
  dialogTitles: string[]
  isInbound: boolean
  onSaveSuccess: () => void
  onClose: () => void
  warehouseProducts?: WarehouseProduct[] | null
}

const ProductInventoryDialog: React.FC<ProductInventoryDialogProps> = (
  props
) => {
  const {
    dialogTitles,
    isInbound,
    open,
    onClose,
    onSaveSuccess,
    warehouseProducts = [],
  } = props
  const [firstPageDialogTitle, secondPageDialogTitle] = dialogTitles

  const theme = useTheme()
  const user = useUser()

  const { createMutation } = useCreateMutation({ module: inventoryModule })

  const [warehouseProduct, setWarehouseProduct] =
    useState<WarehouseProduct | null>()
  const [quantity, setQuantity] = useState<number>(0)

  const instock = getInstock(warehouseProduct?.inventory)
  const status = getWarehouseProductStatus(instock)

  const resetState = () => {
    setWarehouseProduct(null)
    setQuantity(0)
  }

  const handleClose = () => {
    resetState()
    onClose()
  }
  const handleDecrement = () => {
    if (quantity <= 0) return

    setQuantity(quantity - 1)
  }
  const handleIncrement = () => setQuantity(quantity + 1)
  const handleClickSave = async () => {
    if (!warehouseProduct) return

    try {
      await createMutation.mutateAsync({
        created_by: user?.dbUser?.id,
        updated_by: user?.dbUser?.id,
        in: isInbound ? quantity : 0,
        out: !isInbound ? quantity : 0,
        warehouse_id: warehouseProduct.warehouse_id,
        product_id: warehouseProduct.product_id,
      })

      onSaveSuccess()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
    >
      <Stack
        direction="row"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'neutral.300',
          justifyContent: 'space-between',
          pr: 2,
          width: '100%',
        }}
      >
        <DialogTitle variant="h5">
          {warehouseProduct ? firstPageDialogTitle : secondPageDialogTitle}
        </DialogTitle>
        <IconButton onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        {warehouseProduct ? (
          <Stack direction="row" sx={{ alignItems: 'stretch', gap: 2 }}>
            <StorageAvatar
              alt={warehouseProduct?.product?.avatar_alt || undefined}
              src={warehouseProduct?.product?.avatar_src || undefined}
              variant="rounded"
              sx={{ height: 148, width: 283 }}
            />
            <Stack spacing={1}>
              <Box sx={{ justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight={500} mb={1}>
                  {warehouseProduct.warehouse.title}
                </Typography>
                <Typography
                  color="neutral.500"
                  fontWeight={400}
                  variant="subtitle2"
                >
                  <StatusCell
                    color={getColorFromStatusConfig(WAREHOUSE_STATUS_CONFIG)(
                      status
                    )}
                    label={[instock > 0 && instock, status.toUpperCase()]
                      .filter(Boolean)
                      .join(' ')}
                    sx={{
                      '& > .MuiChip-label': {
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      },
                    }}
                  />
                </Typography>
              </Box>
              <Stack direction="row" sx={{ gap: 1 }}>
                <IconButton
                  onClick={handleDecrement}
                  sx={{ boxShadow: 3, minWidth: 56 }}
                >
                  <Remove />
                </IconButton>
                <NumberField
                  allowNegative={false}
                  value={quantity}
                  onChange={setQuantity}
                />
                <IconButton
                  onClick={handleIncrement}
                  sx={{ boxShadow: 3, minWidth: 56 }}
                >
                  <Add />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          warehouseProducts?.map((warehouseProduct) => (
            <Stack
              direction="row"
              key={`${warehouseProduct.warehouse_id},${warehouseProduct.product_id}`}
              onClick={() => setWarehouseProduct(warehouseProduct)}
              sx={{
                alignItems: 'center',
                backgroundColor: 'background.default',
                borderRadius: 1,
                cursor: 'pointer',
                gap: 2,
                mb: 2,
                p: 3,
              }}
            >
              <Stack
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <StorefrontOutlinedIcon sx={{ color: 'primary.main' }} />
              </Stack>
              <Box>
                <Typography fontWeight={500}>
                  {warehouseProduct.warehouse.title}
                </Typography>
                <Typography
                  color="neutral.500"
                  fontWeight={400}
                  variant="subtitle2"
                >
                  {getInstock(warehouseProduct.inventory)}
                </Typography>
              </Box>
            </Stack>
          ))
        )}
      </DialogContent>
      <Box>
        {warehouseProduct && (
          <Stack
            direction="row"
            sx={{
              borderTop: '1px solid',
              borderColor: 'neutral.300',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button variant="paper" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={quantity <= 0}
              variant="contained"
              onClick={handleClickSave}
            >
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </Dialog>
  )
}

export default ProductInventoryDialog
