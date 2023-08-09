import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { first } from 'lodash'
import { useCreateMutation } from '@gravis-os/crud'
import { Inventory } from '@prisma/client'
import { useUser } from '@gravis-os/auth'
import { useRouter } from 'next/router'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  loanFormFormSchema,
  loanFormFormSections,
  loanFormModule,
} from '@admin/modules/LoanForm/loanFormConfig'
import { getNetUnitPriceFromLine } from '@admin/modules/Quotation/utils'
import { LoanForm } from '@admin/modules/LoanForm/types'
import inventoryModule from '@admin/modules/Inventory/inventoryModule'
import { useFetchLoanForms } from '@admin/modules/LoanForm/hooks/useFetchLoanForms'
import LoanFormReceiveItemsDialogButton from '@admin/modules/LoanForm/components/LoanFormReceiveItemsDialogButton'
import LoanFormReturnedItemsDialogButton from '@admin/modules/LoanForm/components/LoanFormReturnedItemsDialogButton'

const LoanFormDetailPage: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()

  const [item, setItem] = useState<LoanForm | null>()

  const { data, isFetched } = useFetchLoanForms(
    {
      match: { id: item?.id },
      select: loanFormModule.select.detail,
    },
    { enabled: Boolean(item?.id) }
  )

  const { createMutation: createInventoryMutation } =
    useCreateMutation<Inventory>({
      module: inventoryModule,
    })

  const createInventory = async () => {
    const loanForm = first(data)
    const { lines = [] } = loanForm || {}

    await Promise.all(
      lines
        .filter(({ product, warehouse }) => product && warehouse)
        .map(({ id, quantity, product, warehouse }) =>
          createInventoryMutation.mutateAsync({
            warehouse_id: warehouse?.id,
            product_id: product?.id,
            loan_form_line_id: id,
            out: quantity,
            created_by: user?.id,
            updated_by: user?.id,
          })
        )
    )

    router.push(
      `${loanFormModule.route.plural}/${loanForm?.[loanFormModule.sk]}`
    )
  }

  useEffect(() => {
    if (!item?.id || !isFetched) return

    createInventory()
  }, [item?.id, isFetched])

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Loan Form Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.LOAN_FORM}
        module={loanFormModule}
        formSections={loanFormFormSections}
        headerProps={{
          renderButton: (props) => (
            <LoanFormReceiveItemsDialogButton {...props} />
          ),
        }}
        crudFormProps={{
          formTemplateProps: {
            actionButtons: [<LoanFormReturnedItemsDialogButton />],
          },
          useCrudFormProps: {
            defaultValues: { title: '-' },
            resolver: yupResolver(loanFormFormSchema),
            afterSubmit: ({ item }) => setItem(item as LoanForm),
            setFormValues: (props) => {
              const { item, values, isNew } = props
              const { created_by } = item as LoanForm
              const { lines } = values || []

              const nextLines = lines
                .filter(({ product_id }) => product_id) // filter untouched lines
                .map((line) => ({
                  ...line,
                  unit_price: line?.unit_price
                    ? line.unit_price
                    : getNetUnitPriceFromLine(line),
                  created_by: isNew ? user?.id : created_by,
                  updated_by: user?.id,
                }))

              return { ...values, lines: nextLines }
            },
          },
        }}
      />
    </DashboardLayout>
  )
}

export default LoanFormDetailPage
