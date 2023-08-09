import React, { useRef, useState } from 'react'
import { useCreateMutation } from '@gravis-os/crud'
import useUser from '@admin/app/useUser'
import { DeliveryInstruction } from '@prisma/client'
import { Button } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { first, groupBy, sumBy, uniqBy } from 'lodash'
import { Dayjs } from 'dayjs'
import { DeliveryOrder, DeliveryOrderLine } from '../../types'
import DialogButton from '../../../../components/DialogButton'
import DeliveryInstructionWarehouseDateStep from './DeliveryInstructionWarehouseDateStep'
import { useFetchReservations } from '../../../Reservation/hooks/useFetchReservations'
import { deliveryInstructionModule } from '../../../DeliveryInstruction/deliveryInstructionModule'
import { deliveryInstructionLineModule } from '../../../DeliveryInstruction/deliveryInstructionLineConfig'
import DeliveryInstructionSuccessStep from './DeliveryInstructionSuccessStep'
import { Reservation } from '../../../Reservation/types'

interface DeliveryInstructionAddDialogProps {
  deliveryOrder: DeliveryOrder
}

const DeliveryInstructionAddDialog: React.FC<
  DeliveryInstructionAddDialogProps
> = (props) => {
  const { user } = useUser()
  const { deliveryOrder } = props

  const { data: reservations = [] } = useFetchReservations(
    {
      match: {
        'order_form_line.order_form.sales_order_id':
          deliveryOrder?.sales_order?.id,
      },
      select:
        '*, order_form_line!inner(*, order_form!inner(*)), warehouse_product(*, inventory(*), product(*), warehouse(*))',
    },
    { enabled: Boolean(deliveryOrder?.sales_order?.id) }
  )

  const groupedReservations = Object.values(
    groupBy(reservations, ({ product_id, warehouse_id }) =>
      [product_id, warehouse_id].join('-')
    )
  ).map((reservationsByProduct: Reservation[]) => ({
    ...first(reservationsByProduct),
    quantity:
      sumBy(reservationsByProduct, 'in') - sumBy(reservationsByProduct, 'out'),
  }))

  const [step, setStep] = useState(1)
  const handleNext = () => setStep(step + 1)

  const selectDateStepRef = useRef<AgGridReact>(null)
  const getWarehousesWithDate = () => {
    const data: (Reservation & { date: Dayjs })[] = []
    selectDateStepRef.current?.api?.forEachNode((rowNode) =>
      data.push(rowNode.data)
    )
    return data
  }

  const [deliveryInstructions, setDeliveryInstructions] =
    useState<DeliveryInstruction[]>()
  const { createMutation: createDeliveryInstructionMutation } =
    useCreateMutation<DeliveryInstruction>({
      module: deliveryInstructionModule,
    })
  const { createMutation: createDeliveryInstructionLineMutation } =
    useCreateMutation<DeliveryOrderLine>({
      module: deliveryInstructionLineModule,
    })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasCreatedDeliveryInstructions = !isSubmitting && deliveryInstructions

  const handleCreateDeliveryInstructions = async () => {
    const warehousesWithDate = getWarehousesWithDate()
    try {
      setIsSubmitting(true)

      const deliveryInstructions = await Promise.all(
        uniqBy(warehousesWithDate, 'warehouse_id').map(
          async (warehouseWithDate) => {
            const { data, error } =
              await createDeliveryInstructionMutation.mutateAsync({
                title: '',
                slug: '',
                created_by: user?.id,
                updated_by: user?.id,
                pick_up_at: warehouseWithDate.date.toISOString(),
                delivery_order_id: deliveryOrder.id,
                warehouse_id: warehouseWithDate.warehouse_id,
              })

            const deliveryInstruction: DeliveryInstruction | undefined =
              first(data)

            if (!deliveryInstruction || error) throw error

            await Promise.all([
              ...groupedReservations
                .filter(
                  ({ warehouse_id }) =>
                    warehouse_id === warehouseWithDate.warehouse_id
                )
                .map((reservation, index) =>
                  createDeliveryInstructionLineMutation.mutateAsync({
                    position: index + 1,
                    created_by: user?.id,
                    updated_by: user?.id,
                    delivery_instruction_id: deliveryInstruction.id,
                    product_id: reservation?.product_id,
                    quantity: reservation?.in,
                  })
                ),
            ])
            return { ...deliveryInstruction, warehouse: warehouseWithDate }
          }
        )
      )

      setDeliveryInstructions(deliveryInstructions)
      handleNext()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DialogButton
      title="Add Pick & Pack"
      buttonProps={{
        disabled: isSubmitting,
        variant: 'contained',
      }}
      renderActions={({ onClose }) => {
        return hasCreatedDeliveryInstructions ? (
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleCreateDeliveryInstructions}
          >
            Confirm
          </Button>
        )
      }}
    >
      {hasCreatedDeliveryInstructions ? (
        <DeliveryInstructionSuccessStep
          deliveryInstructions={deliveryInstructions}
          deliveryOrder={deliveryOrder}
        />
      ) : (
        <DeliveryInstructionWarehouseDateStep
          reservations={groupedReservations as Reservation[]}
          ref={selectDateStepRef}
        />
      )}
    </DialogButton>
  )
}

export default DeliveryInstructionAddDialog
