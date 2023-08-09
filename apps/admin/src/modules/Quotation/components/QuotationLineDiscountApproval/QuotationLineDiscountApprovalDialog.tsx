import React from 'react'
import { Box, Typography } from '@gravis-os/ui'
import { QuotationLine } from '@admin/modules/Quotation/types'
import { PercentageField } from '@gravis-os/fields'

export interface QuotationLineDiscountApprovalDialogProps {
  discount: number
  line: QuotationLine
  onChange: (percentage: number) => void
}

const QuotationLineDiscountApprovalDialog: React.FC<
  QuotationLineDiscountApprovalDialogProps
> = (props) => {
  const { discount, line, onChange } = props
  const { product } = line || {}

  return (
    <div>
      <Typography sx={{ mb: 2 }}>You are requesting discount for:</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          Model Code {product?.model_code}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {product?.title}
        </Typography>
      </Box>
      <PercentageField
        allowNegative={false}
        value={discount}
        onChange={onChange}
      />
    </div>
  )
}

export default QuotationLineDiscountApprovalDialog
