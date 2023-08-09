import React from 'react'
import { SplitButton, SplitButtonOption, Stack } from '@gravis-os/ui'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { yupResolver } from '@hookform/resolvers/yup'
import Router from 'next/router'
import { noop } from 'lodash'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import {
  deliveryOrderFormSchema,
  deliveryOrderFormSections,
} from './deliveryOrderConfig'
import { deliveryOrderModule } from './deliveryOrderModule'
import { DeliveryOrder } from './types'
import DeliveryInstructionAddDialog from './components/DeliveryInstructionAddDialog'

const MAX_ROW_TO_FIT_PAGE = 2
interface DeliveryOrderGeneralTabProps {
  deliveryOrder: DeliveryOrder
}

type DeliveryOrderGeneralTabDialog = 'DELIVERY_INSTRUCTION' | 'GOODS_DELIVERED'

const DeliveryOrderGeneralTab: React.FC<DeliveryOrderGeneralTabProps> = (
  props
) => {
  const { deliveryOrder } = props

  const { isPrintMode, handlePrint } = usePdfPrint()

  const options: SplitButtonOption<DeliveryOrderGeneralTabDialog>[] = [
    {
      label: 'Add Pick & Pack',
      value: 'DELIVERY_INSTRUCTION',
      render: () => (
        <DeliveryInstructionAddDialog deliveryOrder={deliveryOrder} />
      ),
    },
    { label: 'Goods Delivered', value: 'GOODS_DELIVERED', disabled: true },
  ]

  const shouldPushToNewPage =
    deliveryOrder?.lines?.length <= MAX_ROW_TO_FIT_PAGE

  return (
    <>
      {!isPrintMode && (
        <Stack direction="row" sx={{ justifyContent: 'flex-end', mb: 2 }}>
          <SplitButton options={options} onClick={noop} />
        </Stack>
      )}
      <DocumentDetailPage
        type={DocumentTypeEnum.DELIVERY_ORDER}
        module={deliveryOrderModule}
        containerProps={{ disableGutters: true }}
        formSections={deliveryOrderFormSections}
        crudFormProps={{
          disableHeader: true,
          useCrudFormProps: {
            defaultValues: { title: '-' },
            resolver: yupResolver(deliveryOrderFormSchema),
            afterSubmit: (props) => {
              const { item } = props
              const { slug } = item as DeliveryOrder

              Router.push(`${deliveryOrderModule.route.plural}/${slug}`)
            },
          },
          formTemplateProps: {
            onPrint: () =>
              handlePrint({
                filename:
                  deliveryOrder?.title &&
                  `${deliveryOrder.slug.toUpperCase()}.pdf`,
              }),
            printMode: isPrintMode,
          },
        }}
      />
    </>
  )
}

export default DeliveryOrderGeneralTab
