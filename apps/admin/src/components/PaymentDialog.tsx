import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Divider, Grid, Stack, TextField } from '@mui/material'
import { AmountField, DateField } from '@gravis-os/fields'
import { printAmount } from '@gravis-os/utils'
import NumberFormat from 'react-number-format'
import DialogButton from './DialogButton'

interface PaymentFormValues {
  amount: number
  currency: string
  type: string
  paid_at: Date
  paid_to: string
  rate?: number
  note?: string
}

interface PaymentDialogProps {
  outstandingAmount: number
  onSubmit: ({
    onSuccess,
  }: {
    onSuccess: VoidFunction
  }) => (values: PaymentFormValues) => unknown
}

const PaymentDialog: React.FC<PaymentDialogProps> = (props) => {
  const { outstandingAmount, onSubmit } = props

  const defaultValues = {
    amount: outstandingAmount,
    currency: 'SGD',
    rate: 1,
    type: 'Bank Transfer',
    paid_at: new Date(),
  }

  const paymentFormSchema = yup.lazy(() =>
    yup.object({
      amount: yup
        .number()
        .required('Amount is required')
        .min(1, 'Minimum amount is 1')
        .max(outstandingAmount, 'Amount cannot exceed outstanding'),
      currency: yup.string().required('Currency is required'),
      rate: yup.number().when('currency', {
        is: (currency) => currency?.toUpperCase() === 'SGD',
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(),
      }),
      type: yup.string().required('Payment Type is required'),
      paid_at: yup.date().nullable().required('Payment Date is required'),
      paid_to: yup.string().required('Deposit To is required'),
    })
  )

  const { control, handleSubmit, formState, reset, watch } =
    useForm<PaymentFormValues>({
      defaultValues,
      resolver: yupResolver(paymentFormSchema),
    })
  const { errors } = formState
  const currency = watch('currency')

  useEffect(() => {
    reset(defaultValues)
  }, [outstandingAmount])

  const disabled = outstandingAmount <= 0

  return (
    <DialogButton
      title="Record Payment"
      buttonProps={{ variant: 'contained', disabled }}
      onClose={() => reset(defaultValues)}
      renderActions={({ onClose }) => (
        <>
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit({ onSuccess: onClose }))}
          >
            Record Payment
          </Button>
        </>
      )}
    >
      <Stack spacing={2}>
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <AmountField
                  label="Amount"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.amount)}
                  helperText={
                    errors.amount?.message ??
                    `Outstanding Amount: ${currency} ${printAmount(
                      outstandingAmount
                    )}`
                  }
                  fixedDecimalScale
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  label="Currency"
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.currency)}
                  helperText={errors.currency?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <NumberFormat
                  customInput={TextField}
                  thousandSeparator
                  decimalScale={4}
                  onValueChange={(target) => field.onChange(target.floatValue)}
                  isNumericString
                  fixedDecimalScale
                  label="Rate"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.rate)}
                  helperText={errors.rate?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
        <Divider />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              label="Payment Type"
              error={Boolean(errors.type)}
              helperText={errors.type?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="paid_at"
          control={control}
          render={({ field }) => (
            <DateField
              label="Payment Date"
              error={Boolean(errors.paid_at)}
              helperText={errors.paid_at?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="paid_to"
          control={control}
          render={({ field }) => (
            <TextField
              label="Deposit To"
              error={Boolean(errors.paid_to)}
              helperText={errors.paid_to?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <TextField label="Remarks" multiline rows={6} {...field} />
          )}
        />
      </Stack>
    </DialogButton>
  )
}

export default PaymentDialog
