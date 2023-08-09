import { Box, Card, Stack } from '@gravis-os/ui'
import { assign, find, isEqual, isNil, kebabCase, map } from 'lodash'
import React, { useState } from 'react'
import { QuotationIronmongeryRoom } from '../types'
import QuotationIronmongeryAddRoomDialogButton from './QuotationIronmongeryAddRoomDialog'
import QuotationIronmongeryRoomCollapsible from './QuotationIronmongeryRoomCollapsible'

// TODO@Roby: Add types once QuotationLinesFieldArray is typed
export interface QuotationIronmongeryLinesFieldArrayProps {}

/** Parent component of the DataTable section of the page. */
const QuotationIronmongeryLinesFieldArray: React.FC<
  QuotationIronmongeryLinesFieldArrayProps
> = (): React.ReactElement => {
  /* States */
  const [rooms, setRooms] = useState<QuotationIronmongeryRoom[]>([])

  /* Function */
  const handleRoomEdit = (current: QuotationIronmongeryRoom) => {
    setRooms(
      map(rooms, (room) => (isEqual(room.id, current.id) ? current : room))
    )
  }

  return (
    // Main Card Wrapper
    <Card>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mb: 1 }}
      />
      <Stack>
        {/* List of Rooms */}
        {map(rooms, (room, i) => {
          const key = `${kebabCase(room.doorLocation)}-${i}`
          return (
            <QuotationIronmongeryRoomCollapsible
              key={key}
              id={key}
              room={room}
              onEdit={handleRoomEdit}
            />
          )
        })}
        {/* Add Room Box */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={200}
          sx={{
            borderStyle: 'dashed',
            borderColor: 'divider',
          }}
        >
          <QuotationIronmongeryAddRoomDialogButton
            rooms={rooms}
            setRooms={setRooms}
          />
        </Box>
      </Stack>
    </Card>
  )
}

export default QuotationIronmongeryLinesFieldArray
