import React, { useRef, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import StepWizard, {
  StepWizardChildProps,
  StepWizardProps,
} from 'react-step-wizard'
import { DataTable, useCreateMutation } from '@gravis-os/crud'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import useUser from '@admin/app/useUser'
import { AgGridReact } from 'ag-grid-react'
import { lte, sumBy } from 'lodash'
import inventoryModule from '../../Inventory/inventoryModule'
import { Inventory } from '../../Warehouse/types'
import StepWizardNav from '../../../components/StepWizardNav'
import DialogButton from '../../../components/DialogButton'
import purchaseOrderModule from '../purchaseOrderModule'
import { PurchaseOrder, PurchaseOrderLine } from '../types'
import TextEditor from '../../../components/editors/TextEditor'

const getUnreceivedQuantityFromPurchaseOrderLine = ({
  quantity,
  inventory,
}: PurchaseOrderLine) => quantity - sumBy(inventory, 'in')

type PurchaseOrderLineWithReceivingQuantity = PurchaseOrderLine & {
  receiving_quantity: number
}

const PurchaseOrderReceiveItems: React.FC = () => {
  const { user } = useUser()
  const { query } = useRouter()
  const { slug } = query
  const isNew = slug === 'new'

  const { data: purchaseOrder, isFetching } = useQuery({
    queryKey: [purchaseOrderModule.table.name, slug],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from<PurchaseOrder>(purchaseOrderModule.table.name)
        .select(purchaseOrderModule.select.detail)
        .match({ slug })
        .single()
      return data
    },
    enabled: Boolean(user && slug),
  })
  const purchaseOrderLines: PurchaseOrderLineWithReceivingQuantity[] =
    purchaseOrder?.lines
      .map((line) => ({
        ...line,
        receiving_quantity: getUnreceivedQuantityFromPurchaseOrderLine(line),
      }))
      .filter(({ receiving_quantity }) => receiving_quantity > 0) || []

  // TODO: refactor to hook
  const [wizard, setWizard] = useState<StepWizardChildProps>()
  const [step, setStep] = useState(1)
  const handleNext = () => wizard?.nextStep()
  const handleBack = () => wizard?.previousStep()
  const handleStepChange: StepWizardProps['onStepChange'] = ({ activeStep }) =>
    setStep(activeStep)

  const queryClient = useQueryClient()
  const { createMutation: createInventoryMutation } =
    useCreateMutation<Inventory>({
      module: inventoryModule,
      options: {
        onSuccess: () =>
          queryClient.invalidateQueries([purchaseOrderModule.table.name, slug]),
      },
    })
  const quantityRef = useRef<AgGridReact>()
  const [receivingLines, setReceivingLines] = useState<
    PurchaseOrderLineWithReceivingQuantity[]
  >([])
  const [refNo, setRefNo] = useState<string>()
  const handleSubmit =
    ({ onClose }: { onClose: VoidFunction }) =>
    async () => {
      await Promise.all(
        receivingLines.map(async (line) => {
          const {
            id,
            purchase_order: { warehouse_id },
            product_id,
            receiving_quantity: quantity,
          } = line
          return createInventoryMutation.mutateAsync({
            in: quantity,
            ref_no: refNo,
            warehouse_id,
            product_id,
            purchase_order_line_id: id,
            created_by: user?.id,
            updated_by: user?.id,
          })
        })
      )
      queryClient.invalidateQueries()
      onClose()
    }
  const handleContinue = () => {
    const receivingLines: PurchaseOrderLineWithReceivingQuantity[] =
      quantityRef.current?.api
        .getSelectedRows()
        .filter(
          ({ receiving_quantity }) =>
            Number.parseInt(String(receiving_quantity), 10) > 0
        ) || []
    const isValidQuantities =
      receivingLines.length > 0 &&
      receivingLines.every(
        (line) =>
          line.receiving_quantity <=
          getUnreceivedQuantityFromPurchaseOrderLine(line)
      )
    if (isValidQuantities) {
      setReceivingLines(receivingLines)
      handleNext()
    }
  }
  const handleReset = () => {
    setStep(1)
    setRefNo('')
  }

  const steps = [
    {
      label: 'SELECT QUANTITY',
      value: 1,
      children: (
        <DataTable
          key="select-quantity"
          ref={quantityRef}
          singleClickEdit
          rowData={purchaseOrderLines}
          columnDefs={[
            {
              colId: 'checkbox',
              maxWidth: 50,
              checkboxSelection: true,
              suppressMenu: true,
              headerCheckboxSelection: true,
              headerCheckboxSelectionFilteredOnly: true,
            },
            {
              field: 'product.model_code',
              headerName: 'Model Code',
              minWidth: 120,
              maxWidth: 120,
            },
            {
              field: 'product.title',
              headerName: 'Product Name',
            },
            {
              field: 'order_form_line_id',
              headerName: 'Ref',
              valueGetter: ({ data }) =>
                data.order_form_line?.order_form?.title || 'Company Stock',
              maxWidth: 150,
            },
            {
              field: 'receiving_quantity',
              headerName: 'Qty',
              maxWidth: 150,
              editable: true,
              cellRenderer: TextEditor,
              cellEditor: TextEditor,
              cellStyle: { height: '100%' },
              cellRendererParams: ({
                data,
                value,
              }: {
                data: PurchaseOrderLine
                value: number
              }) => ({
                withToastValidationProps: {
                  helperText:
                    'Please ensure quantity does not exceed ordered quantity.',
                  validatorFns: [
                    () =>
                      lte(
                        value,
                        getUnreceivedQuantityFromPurchaseOrderLine(data)
                      ),
                  ],
                },
              }),
            },
          ]}
        />
      ),
      renderActions: ({ onClose }) => (
        <>
          <Button color="inherit" onClick={onClose}>
            Back
          </Button>
          <Button variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </>
      ),
    },
    {
      label: 'SUPPLIER REFERENCE NO',
      value: 2,
      children: (
        <Stack key="supplier-reference-no" spacing={2} mt={3}>
          <Typography variant="caption">
            Note down the supplier reference number for recording purposes.
          </Typography>
          <TextField
            label="Supplier Reference Number"
            onChange={(event) => setRefNo(event.target.value)}
            value={refNo}
          />
        </Stack>
      ),
      renderActions: ({ onClose }) => (
        <>
          <Button color="inherit" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleSubmit({ onClose })}>
            Receive Items
          </Button>
        </>
      ),
    },
  ]
  const currentStep = steps.find(({ value }) => value === step)

  const disabled = isNew || isFetching || !purchaseOrderLines?.length

  return (
    <DialogButton
      title="Receive Items"
      buttonProps={{ variant: 'contained', disabled }}
      renderActions={currentStep?.renderActions}
      transitionProps={{ unmountOnExit: true }}
      onClose={handleReset}
    >
      <Box mt={-2.5}>
        <StepWizard
          nav={<StepWizardNav steps={steps} />}
          instance={(wizard) => setWizard(wizard as StepWizardChildProps)}
          onStepChange={handleStepChange}
        >
          {steps.map(({ children }) => children)}
        </StepWizard>
      </Box>
    </DialogButton>
  )
}

export default PurchaseOrderReceiveItems
