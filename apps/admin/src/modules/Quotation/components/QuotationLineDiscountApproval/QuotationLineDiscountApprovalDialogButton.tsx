import React, { useEffect, useState } from 'react'
import QuotationLineDiscountApprovalDialog from '@admin/modules/Quotation/components/QuotationLineDiscountApproval/QuotationLineDiscountApprovalDialog'
import DialogButton from '@admin/components/DialogButton'
import { Update as UpdateIcon } from '@mui/icons-material'
import { QuotationLine } from '@admin/modules/Quotation/types'

interface QuotationLineDiscountApprovalDialogButtonProps {
  line: QuotationLine
  onSubmit: (requestedDiscountRate: number) => void
}

const QuotationLineDiscountApprovalDialogButton: React.FC<
  QuotationLineDiscountApprovalDialogButtonProps
> = (props) => {
  const { line, onSubmit } = props
  const { discount_rate: injectedDiscount } = line || {}

  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    if (!injectedDiscount) return
    setDiscount(injectedDiscount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickRequest = () => onSubmit(discount)

  return (
    <DialogButton
      title="Request for Discount"
      buttonProps={{
        variant: 'text',
        color: 'inherit',
        sx: { justifyContent: 'flex-start', px: 2 },
        startIcon: <UpdateIcon fontSize="small" />,
      }}
      actionButtonProps={{
        children: 'Request for Discount',
        onClick: handleClickRequest,
      }}
    >
      <QuotationLineDiscountApprovalDialog
        discount={discount}
        line={line}
        onChange={setDiscount}
      />
    </DialogButton>
  )
}

export default QuotationLineDiscountApprovalDialogButton
