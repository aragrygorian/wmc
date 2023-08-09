import React from 'react'
import { Company, OrderForm, SalesOrder, SalesOrderLine } from '@prisma/client'
import { Box, Container, Stack, Typography } from '@mui/material'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { Dayjs } from 'dayjs'
import Router from 'next/router'
import { routes } from '@admin/app/routes'

interface OrderFormWizardSuccessStepProps {
  orderForms: OrderForm[]
  salesOrder: SalesOrder
  items: Array<{ company: Company; lines: SalesOrderLine[]; date: Dayjs }>
}

const OrderFormWizardSuccessStep: React.FC<OrderFormWizardSuccessStepProps> = (
  props
) => {
  const { orderForms, salesOrder, items } = props
  const orderFormsWithCompany = orderForms.map(({ company_id, ...rest }) => ({
    ...rest,
    company: items.find(({ company }) => company.id === company_id)?.company,
    company_id,
  }))
  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" textAlign="center">
        <Box component="img" src="/checked.svg" my={4} />
        <Typography variant="h3" fontWeight={700} mb={1}>
          {orderForms.length} Order Forms Added
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={6}>
          You have successfully added {orderForms.length} Order Forms from{' '}
          {salesOrder.title}.
        </Typography>
        <Stack spacing={1} width="100%">
          {orderFormsWithCompany.map(({ id, title, slug, company }) => (
            <Stack
              key={id}
              direction="row"
              spacing={2}
              sx={{
                py: 3,
                px: 2,
                bgcolor: 'grey.50',
                ':hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  cursor: 'pointer',
                },
              }}
              onClick={() => Router.push(`${routes.ORDER_FORMS}/${slug}`)}
            >
              <Typography>{title}</Typography>
              <Typography sx={{ flexGrow: 1 }}>{company?.title}</Typography>
              <ArrowRightAltOutlinedIcon />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

export default OrderFormWizardSuccessStep
