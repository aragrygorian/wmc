import React from 'react'
import { SalesOrder } from '@prisma/client'
import { Box, Container, Stack, Typography } from '@mui/material'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import Router from 'next/router'
import { ProgressiveClaim } from '../../../ProgressiveClaim/types'
import progressiveClaimModule from '../../../ProgressiveClaim/progressiveClaimModule'

interface ProgressiveClaimWizardSuccessStepProps {
  progressiveClaim?: ProgressiveClaim | null
  salesOrder: SalesOrder
}

const ProgressiveClaimWizardSuccessStep: React.FC<
  ProgressiveClaimWizardSuccessStepProps
> = (props) => {
  const { progressiveClaim, salesOrder } = props
  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" textAlign="center">
        <Box component="img" src="/checked.svg" my={4} />
        <Typography variant="h3" fontWeight={700} mb={1}>
          1 Progressive Claim Added
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={6}>
          You have successfully added 1 Progressive Claim from{' '}
          {salesOrder.title}.
        </Typography>
        <Stack spacing={1} width="100%">
          <Stack
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
            onClick={() => {
              Router.push(
                `${progressiveClaimModule.route.plural}/${
                  progressiveClaim?.[progressiveClaimModule.sk]
                }`
              )
            }}
          >
            <Typography>{progressiveClaim?.title}</Typography>
            <ArrowRightAltOutlinedIcon />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default ProgressiveClaimWizardSuccessStep
