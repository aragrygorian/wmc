import { Button, IconButton, Stack } from '@gravis-os/ui'
import EditIcon from '@mui/icons-material/Edit'
import { assign } from 'lodash'
import React, { Dispatch, SetStateAction } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import DialogButton from '../../../components/DialogButton'
import { QuotationIronmongeryRoom } from '../types'
import QuotationIronmongeryRoomForm from './QuotationIronmongeryRoomForm'

export interface QuotationIronmongeryEditRoomDialogProps {
  room: QuotationIronmongeryRoom
  onEdit: (room: QuotationIronmongeryRoom) => void
}

const QuotationIronmongeryEditRoomDialog: React.FC<
  QuotationIronmongeryEditRoomDialogProps
> = (props): React.ReactElement => {
  const { room, onEdit } = props

  /* Form */
  const formContext = useForm({ defaultValues: room })
  const { handleSubmit } = formContext

  /* Functions */
  const onSubmit = (data: FieldValues, onClose: VoidFunction) => {
    onEdit(data as QuotationIronmongeryRoom)
    onClose()
  }

  return (
    <DialogButton
      title="Edit Door Location"
      dialogProps={{ fullScreen: false, maxWidth: 'md' }}
      renderTrigger={({ onClick }) => (
        <IconButton onClick={onClick}>
          <EditIcon />
        </IconButton>
      )}
      renderActions={({ onClose }) => (
        <Stack spacing={2} direction="row" sx={{ p: 1 }}>
          <Button onClick={onClose} fullWidth variant="muted">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit(data, onClose))}
            fullWidth
            variant="contained"
          >
            Edit
          </Button>
        </Stack>
      )}
    >
      {/* Form Section */}
      <FormProvider {...formContext}>
        <QuotationIronmongeryRoomForm />
      </FormProvider>
    </DialogButton>
  )
}

export default QuotationIronmongeryEditRoomDialog
