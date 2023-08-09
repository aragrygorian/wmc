import { Button, Stack } from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Router from 'next/router'
import React from 'react'
import DialogButton from '../../../components/DialogButton'
import { QuotationType } from '../constants'
import { quotationModule } from '../quotationModule'

export interface QuotationTypeDialogProps {}

const QuotationTypeDialog: React.FC<
  QuotationTypeDialogProps
> = (): React.ReactElement => {
  /* Redirect */
  const handleRedirect = (type: string) => () => {
    Router.push(quotationModule.route.plural.concat(`/new?type=${type}`))
  }
  return (
    <DialogButton
      title="Choose Quotation Type"
      disableActions
      dialogProps={{ fullScreen: false, maxWidth: 'lg' }}
      renderTrigger={({ onClick }) => (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          variant="contained"
          fullWidthOnMobile
          onClick={onClick}
        >
          Add Quotation
        </Button>
      )}
    >
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleRedirect(QuotationType.Standard)}
        >
          Standard
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleRedirect(QuotationType.IronMongery)}
        >
          Ironmongery
        </Button>
      </Stack>
    </DialogButton>
  )
}

export default QuotationTypeDialog
