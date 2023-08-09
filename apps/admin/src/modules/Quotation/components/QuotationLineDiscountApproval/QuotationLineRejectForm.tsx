import React from 'react'
import { QuotationLine } from '@admin/modules/Quotation/types'
import { Box, Grid, Typography } from '@gravis-os/ui'
import { get, identity, startCase } from 'lodash'
import { printPercentage } from '@gravis-os/utils'
import {
  ControlledPercentageField,
  ControlledTextField,
} from '@gravis-os/fields'
import { Control, UseFormReturn } from 'react-hook-form'

export interface QuotationLineRejectFormFields {
  action: string
  note: string | null
  requested_discount_rate: number | null
}

interface QuotationLineRejectFormProps {
  form: UseFormReturn<QuotationLineRejectFormFields>
  line: QuotationLine
}

export const ACTION_CHANGED = 'changed'
export const ACTION_REJECTED = 'rejected'

const ACTIONS = [ACTION_REJECTED, ACTION_CHANGED]

const FIELDS = [
  {
    field: 'product.brand.title',
    label: 'Brand',
  },
  {
    field: 'product.brand.company.title',
    label: 'Company',
  },
  {
    field: 'requested_discount_rate',
    label: 'Discount Rate',
    formatter: printPercentage,
  },
  {
    field: 'quotation_id',
    label: 'Quotation Ref',
  },
  {
    field: 'status',
    label: 'Status',
  },
]

const QuotationLineRejectForm: React.FC<QuotationLineRejectFormProps> = (
  props
) => {
  const { form, line } = props

  const { control, watch } = form
  const [action] = watch(['action'])

  return (
    <Box>
      <Grid container mb={4} spacing={2}>
        {FIELDS.map(({ field, formatter = identity, label }) => (
          <React.Fragment key={field}>
            <Grid item xs={3}>
              <Typography>{label}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontWeight={600}>
                {formatter(get(line, field))}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ControlledTextField
            select
            control={control as unknown as Control}
            name="action"
            label="Action"
            SelectProps={{
              native: true,
            }}
          >
            {ACTIONS.map((action) => (
              <option key={action} value={action}>
                {startCase(action)}
              </option>
            ))}
          </ControlledTextField>
        </Grid>
        <Grid item xs={6}>
          <ControlledPercentageField
            control={control as unknown as Control}
            name="requested_discount_rate"
            disabled={action === ACTION_REJECTED}
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledTextField
            multiline
            control={control as unknown as Control}
            name="note"
            placeholder="Reasons for Rejection"
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuotationLineRejectForm
