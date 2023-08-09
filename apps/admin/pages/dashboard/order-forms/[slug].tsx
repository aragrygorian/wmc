import {
  DataTable,
  DetailPageHeader,
  useCrudForm,
  useGetItem,
} from '@gravis-os/crud'
import { ModelField } from '@gravis-os/form'
import { TextField } from '@gravis-os/fields'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  ConfirmationDialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import { Container, Link } from '@mui/material'
import { Company, OrderFormLine, SalesOrder, User } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@admin/app/routes'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import Router from 'next/router'
import React, { ReactNode } from 'react'
import { useMutation } from 'react-query'
import { OrderForm } from 'src/modules/OrderForm/types'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { ORDER_FORM_STATUS_CONFIG } from '@admin/modules/OrderForm/constants'
import { orderFormModule } from '@admin/modules/OrderForm/orderFormConfig'
import { orderFormLineColumnDefs } from '@admin/modules/OrderForm/orderFormLineConfig'
import { userModule } from '@admin/modules/User/userConfig'
import map from 'lodash/map'

const OrderFormDetailPage: NextPage = () => {
  const onUseGetItem = useGetItem({ module: orderFormModule })
  const { item, loading, refetch } = onUseGetItem
  const {
    assignee,
    id,
    title,
    company,
    sales_order: salesOrder,
    status,
    lines,
    created_at,
  } = (item || {}) as OrderForm & {
    assignee: User
    lines: OrderFormLine[]
    company: Company
    sales_order: SalesOrder
  }

  const orderFormMutation = useMutation(
    async (nextValues: Partial<OrderForm>) =>
      supabaseClient
        .from(orderFormModule.table.name)
        .update(nextValues)
        .match({ id: item?.id })
  )

  const { onDelete, formContext } = useCrudForm({
    item,
    module: orderFormModule,
    defaultValues: { user: assignee },
  })
  const { setValue } = formContext

  const handleChangeAssignee = async (option) => {
    if (!option) return

    await orderFormMutation.mutateAsync({ assignee_id: option?.id })
  }

  const handleChangeStatus = async (event) => {
    const { target } = event || {}
    const { value } = target || {}

    if (value && value !== status) {
      await orderFormMutation.mutateAsync({ status: value })
      refetch()
    }
  }

  const actionButtons = [
    {
      key: 'print',
      children: 'Print',
      startIcon: <LocalPrintshopOutlinedIcon />,
      color: 'inherit' as const,
    },
    <ConfirmationDialog
      key="delete"
      buttonComponent={Button}
      buttonProps={{
        children: 'Delete',
        startIcon: <DeleteOutlineOutlinedIcon />,
        tooltip: 'Delete',
        color: 'inherit',
      }}
      disableToastSuccess
      onConfirm={() => onDelete({ ...item })}
    />,
  ]

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Order Form Detail</title>
      </Head>
      <Container>
        <Stack spacing={2}>
          <DetailPageHeader
            loading={loading}
            item={item}
            module={orderFormModule}
            buttonProps={{
              key: 'create-purchase-order',
              title: 'Create Purchase order',
              onClick: () =>
                Router.push(`${routes.PURCHASE_ORDERS}/new?order-form=${id}`),
            }}
            title={`Order Form ${title}`}
          />
          <Card
            square
            disableLastGutterBottom
            contentProps={{ sx: { py: 1, pl: 1, pr: 3 } }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              {/* Left */}
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {actionButtons.map((actionButton) => {
                  const isReactElement = React.isValidElement(actionButton)
                  if (isReactElement) return actionButton
                  return <Button {...actionButton} />
                })}
              </Stack>
              {/* Right */}
              <Box sx={{ width: '100%' }}>
                <Grid container>
                  {/* Assignee */}
                  <Grid item xs={6}>
                    <ModelField
                      module={userModule}
                      name="user_ids"
                      setValue={setValue}
                      onChange={handleChangeAssignee}
                      value={assignee?.email}
                      label="Assignee"
                      optionLabelKey="full_name"
                      select="id, title, full_name"
                      renderOption={({ option }) =>
                        (option.full_name ?? option.title) as ReactNode
                      }
                    />
                  </Grid>

                  {/* Status */}
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleChangeStatus}
                      value={status}
                      name="status"
                      options={map(ORDER_FORM_STATUS_CONFIG, 'value')}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Card>

          <Card disableBorderRadiusBottom>
            <Stack spacing={3}>
              {/* Header */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent="space-between"
              >
                <div>
                  <Typography variant="h6" mb={0.5}>
                    Order Form
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created at {dayjs(created_at).format('DD MMM YYYY')}
                    </Typography>
                  </Stack>
                </div>
                <div>
                  <Typography variant="h6" mb={0.5}>
                    Supplier
                  </Typography>
                  <Typography>{company?.title}</Typography>
                </div>
                <div>
                  <Typography variant="h6" mb={0.5}>
                    Sales Order Reference
                  </Typography>
                  <NextLink
                    href={routes.SALES_ORDERS.concat(`/${salesOrder?.slug}`)}
                    passHref
                    target="_blank"
                  >
                    <Link underline="always">
                      <Typography textAlign="right">
                        {salesOrder?.title}
                      </Typography>
                    </Link>
                  </NextLink>
                </div>
              </Stack>

              <Divider />

              <DataTable rowData={lines} columnDefs={orderFormLineColumnDefs} />
            </Stack>
          </Card>
        </Stack>
      </Container>
    </DashboardLayout>
  )
}

export default OrderFormDetailPage
