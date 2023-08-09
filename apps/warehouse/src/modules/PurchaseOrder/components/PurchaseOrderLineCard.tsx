import { TextField } from '@gravis-os/fields'
import { StorageAvatar } from '@gravis-os/storage'
import {
  ActionFooter,
  ACTION_FOOTER_PADDING,
  Button,
  Card,
  Chip,
  Drawer,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { assign, isEqual, sumBy } from 'lodash'
import React, { useState } from 'react'
import { PurchaseOrderLineStatus } from '../utils/constants'
import { PurchaseOrderLine } from '../utils/types'

export interface PurchaseOrderLineCardProps {
  line: PurchaseOrderLine
}

const PurchaseOrderLineCard: React.FC<PurchaseOrderLineCardProps> = (
  props
): React.ReactElement => {
  const { line } = props
  const {
    id,
    product,
    status,
    quantity,
    inventory,
    // Initialize inventoryQuantity to the total amount of received goods
    receiving_quantity: receivingQuantity = sumBy(inventory, 'in'),
  } = line
  const { avatar_src: avatarSrc, model_code: modelCode, title } = product || {}

  /* Open State */
  const [open, setOpen] = useState(false)

  /* Submit */
  const handleSubmit = () => {
    // Set total inventory quantity to full
    assign(line, { receiving_quantity: quantity, received: true })
    setOpen(false)
  }

  const isReceived = isEqual(receivingQuantity, quantity)

  return (
    <>
      {/* Line Card */}
      <Card disableLastGutterBottom onClick={() => setOpen(true)}>
        <Grid container>
          <Grid item xs={3}>
            <StorageAvatar src={avatarSrc} />
          </Grid>
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">#{modelCode}</Typography>
              <Typography variant="caption">{title}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              justifyContent="space-between"
              alignItems="flex-end"
              height="100%"
            >
              <Chip
                label={
                  status ??
                  (isReceived
                    ? PurchaseOrderLineStatus.Received
                    : PurchaseOrderLineStatus.New)
                }
                color={isReceived ? 'success' : 'primary'}
                sx={{ borderRadius: 1 }}
              />
              <Typography>
                {receivingQuantity}/{quantity}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      {/* Drawer */}
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Card
          title="Receive Quantity"
          disablePadding
          disableLastGutterBottom
          sx={{ pb: ACTION_FOOTER_PADDING }}
        >
          <Stack spacing={2} p={2}>
            {/* Product image and detail */}
            <Grid container>
              <Grid item xs={3}>
                <StorageAvatar src={avatarSrc} />
              </Grid>
              <Grid item xs={9}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">#{modelCode}</Typography>
                  <Typography variant="caption">{title}</Typography>
                </Stack>
              </Grid>
            </Grid>
            {/* Palet No */}
            <TextField label="Palet No." disabled value={modelCode} />
            {/* Shelving Location */}
            <TextField label="Shelving Location" disabled value="A-01" />
            {/* Quantity */}
            <TextField label="Quantity" value={quantity} disabled />
          </Stack>
        </Card>
        <ActionFooter
          actions={[
            <Button variant="muted" fullWidth onClick={() => handleSubmit()}>
              CLOSE
            </Button>,
          ]}
        />
      </Drawer>
    </>
  )
}

export default PurchaseOrderLineCard
