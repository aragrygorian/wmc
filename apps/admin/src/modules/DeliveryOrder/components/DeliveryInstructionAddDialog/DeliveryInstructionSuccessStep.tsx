import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import Router from 'next/router'
import { DeliveryOrder } from '../../types'
import { DeliveryInstruction } from '../../../DeliveryInstruction/types'
import { deliveryInstructionModule } from '../../../DeliveryInstruction/deliveryInstructionModule'

interface DeliveryInstructionSuccessStepProps {
  deliveryInstructions: DeliveryInstruction[]
  deliveryOrder: DeliveryOrder
}

const DeliveryInstructionSuccessStep: React.FC<
  DeliveryInstructionSuccessStepProps
> = (props) => {
  const { deliveryInstructions = [], deliveryOrder } = props

  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" textAlign="center">
        <Box component="img" src="/checked.svg" my={4} />
        <Typography variant="h3" fontWeight={700} mb={1}>
          {[
            deliveryInstructions.length,
            ' Pick & Pack ',
            deliveryInstructions.length && 's',
          ]
            .filter(Boolean)
            .join('')}
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={6}>
          You have successfully added {deliveryInstructions.length} Pick & Packs
          from {deliveryOrder.title}.
        </Typography>
        <Stack spacing={1} width="100%">
          {deliveryInstructions.map(
            ({
              id,
              title,
              warehouse,
              [deliveryInstructionModule.sk]: slug,
            }) => (
              <Stack
                key={id}
                direction="row"
                spacing={2}
                sx={{
                  py: 3,
                  px: 2,
                  bgcolor: 'grey.50',
                  ':hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    cursor: 'pointer',
                  },
                }}
                onClick={() =>
                  Router.push(
                    `${deliveryInstructionModule.route.plural}/${slug}`
                  )
                }
              >
                <Typography>{title}</Typography>
                <Typography sx={{ flexGrow: 1 }}>{warehouse?.title}</Typography>
                <ArrowRightAltOutlinedIcon />
              </Stack>
            )
          )}
        </Stack>
      </Stack>
    </Container>
  )
}

export default DeliveryInstructionSuccessStep
