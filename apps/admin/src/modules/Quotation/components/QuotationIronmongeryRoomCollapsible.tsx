import { Box, Divider, Grid, IconButton, Typography } from '@gravis-os/ui'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Collapse } from '@mui/material'
import React, { useState } from 'react'
import { QuotationIronmongeryProduct, QuotationIronmongeryRoom } from '../types'
import QuotationIronmongeryEditRoomDialog from './QuotationIronmongeryEditRoomDialog'
import QuotationIronmongeryProductTable from './QuotationIronmongeryProductTable'

export interface QuotationIronmongeryRoomCollapsibleProps {
  id: string
  room: QuotationIronmongeryRoom
  onEdit: (room: QuotationIronmongeryRoom) => void
}

/** Collapsible component which represents a single room containing a DataTable of list of products. */
const QuotationIronmongeryRoomCollapsible: React.FC<
  QuotationIronmongeryRoomCollapsibleProps
> = (props): React.ReactElement => {
  const { room, onEdit } = props

  /* States */
  const [expanded, setExpanded] = useState(true) // Expanded by default

  const {
    id,
    doorLocation,
    quantity,
    width,
    thickness,
    height,
    door,
    doorType,
    doorMaterial,
    doorHardware,
    products: roomProducts,
  } = room

  const [products, setProducts] =
    useState<QuotationIronmongeryProduct[]>(roomProducts)

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        px={2}
      >
        <Typography variant="h3">
          {/* Caret */}
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          {/* Door Location */}
          {doorLocation}
        </Typography>
        {/* Door Number */}
        <Typography>Door Number: {door}</Typography>
        {/* Quantity */}
        <Typography>Qty: {quantity}</Typography>
        {/* Size */}
        <Typography>Size: {`${width}x${thickness}x${height}mm`}</Typography>
        {/* Door Type */}
        <Typography>Door Type: {doorType}</Typography>
        {/* Door Material */}
        <Typography>Door Material: {doorMaterial}</Typography>
        {/* Door Hinge */}
        <Typography>Door Hardware: {doorHardware}</Typography>
        {/* Actions */}
        <Box mx={1}>
          {/* Edit */}
          <QuotationIronmongeryEditRoomDialog room={room} onEdit={onEdit} />
        </Box>
      </Grid>

      <Divider />
      {/* Table Content */}
      <Collapse in={expanded}>
        {/* Product Table */}
        <QuotationIronmongeryProductTable setProducts={setProducts} id={id} />
      </Collapse>
    </Box>
  )
}

export default QuotationIronmongeryRoomCollapsible
