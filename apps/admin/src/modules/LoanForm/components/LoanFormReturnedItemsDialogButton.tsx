import React, { FC } from 'react'
import { AssignmentReturnOutlined } from '@mui/icons-material'
import DialogButton from '../../../components/DialogButton'
import LoanFormReturnedItemsDialog from './LoanFormReturnedItemsDialog'

const LoanFormReturnedItemsDialogButton: FC = () => {
  return (
    <DialogButton
      title="Returned Items"
      buttonProps={{
        color: 'inherit',
        startIcon: <AssignmentReturnOutlined />,
        sx: { minWidth: 185 },
      }}
    >
      <LoanFormReturnedItemsDialog />
    </DialogButton>
  )
}

export default LoanFormReturnedItemsDialogButton
