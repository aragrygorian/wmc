import React from 'react'
import { Avatar, Tab, Tabs } from '@mui/material'

interface Step {
  label: string
  value: number // Should start from 1 due to library requirements
  hidden?: boolean
  hideTabs?: boolean
}

interface StepWizardNavProps {
  steps: Step[]
  currentStep?: number
  goToStep?: (step: number | string) => void
}

const StepWizardNav: React.FC<StepWizardNavProps> = (props) => {
  const { currentStep, goToStep, steps } = props
  const { hideTabs } = steps.find(({ value }) => value === currentStep) || {}

  if (hideTabs) return null

  return (
    <Tabs value={currentStep} onChange={(_, value) => goToStep?.(value)}>
      {steps
        .filter(({ hidden }) => !hidden)
        .map(({ label, value }) => (
          <Tab
            key={label}
            label={label}
            icon={
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: currentStep === value ? 'primary.main' : null,
                }}
              >
                {value}
              </Avatar>
            }
            iconPosition="start"
            value={value}
            sx={{ px: 2, py: 0, minHeight: 48 }}
            disabled={currentStep !== value}
          />
        ))}
    </Tabs>
  )
}

export default StepWizardNav
