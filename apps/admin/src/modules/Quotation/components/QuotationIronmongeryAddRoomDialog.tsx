import { Button } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { assign, kebabCase, size } from 'lodash'
import React, { Dispatch, SetStateAction } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import DialogButton from '../../../components/DialogButton'
import { QuotationIronmongeryRoom } from '../types'
import QuotationIronmongeryRoomForm from './QuotationIronmongeryRoomForm'

export interface QuotationIronmongeryAddRoomDialogButtonProps {
  rooms: QuotationIronmongeryRoom[]
  setRooms: Dispatch<SetStateAction<QuotationIronmongeryRoom[]>>
}

/**
 * Button that opens the IronMongery form dialog to create a new room.
 * This component contains all the form inputs and a button that can be clicked to create the room.
 *
 * Array of rooms and setRooms function is passed from parent component.
 */
const QuotationIronmongeryAddRoomDialogButton: React.FC<
  QuotationIronmongeryAddRoomDialogButtonProps
> = (props): React.ReactElement => {
  const { rooms, setRooms } = props

  /* Form */
  const formContext = useForm()
  const { handleSubmit, reset } = formContext

  /* Functions */
  const onAddRoom = (data: FieldValues, onClose: VoidFunction) => {
    // Set room ID
    assign(data, { id: kebabCase(`${data.doorLocation}-${size(rooms)}`) })
    setRooms([...rooms, data as QuotationIronmongeryRoom])
    onClose()
  }

  return (
    <DialogButton
      title="Add Door Location"
      dialogProps={{ fullScreen: false, maxWidth: 'md' }}
      renderTrigger={({ onClick }) => (
        <Button
          startIcon={<AddOutlinedIcon fontSize="small" />}
          fullWidthOnMobile
          onClick={onClick}
        >
          Add Door Location
        </Button>
      )}
      renderActions={({ onClose }) => (
        <Button
          onClick={handleSubmit((data) => onAddRoom(data, onClose))}
          fullWidth
          variant="contained"
          sx={{ m: 1 }}
        >
          Add Room
        </Button>
      )}
      onClose={reset}
    >
      {/* Form Section */}
      <FormProvider {...formContext}>
        <QuotationIronmongeryRoomForm />
      </FormProvider>
    </DialogButton>
  )
}

export default QuotationIronmongeryAddRoomDialogButton
