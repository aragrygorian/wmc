import React from 'react'
import Router from 'next/router'
import { Stack } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Button } from '@gravis-os/ui'
import DialogButton from '../../../components/DialogButton'
import invoiceModule from '../invoiceModule'
import { InvoiceType } from '../constants'

const InvoiceTypeDialog: React.FC = () => {
  const handleRedirect = (type: string) => () =>
    Router.push(invoiceModule.route.plural.concat(`/new?type=${type}`))
  return (
    <DialogButton
      title="Choose Invoice Type"
      disableActions
      dialogProps={{ fullScreen: false, maxWidth: 'lg' }}
      renderTrigger={({ onClick }) => (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          variant="contained"
          fullWidthOnMobile
          onClick={onClick}
        >
          Add Invoice
        </Button>
      )}
    >
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleRedirect(InvoiceType.Itemised)}
        >
          Itemised
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleRedirect(InvoiceType.LumpSum)}
        >
          Lump Sum
        </Button>
      </Stack>
    </DialogButton>
  )
}

export default InvoiceTypeDialog
