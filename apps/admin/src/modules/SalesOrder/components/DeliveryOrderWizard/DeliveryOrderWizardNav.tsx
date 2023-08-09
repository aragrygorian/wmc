import React from 'react'
import StepWizardNav from 'src/components/StepWizardNav'

const STEPS = [
  { label: 'SELECT ITEMS', value: 1 },
  { label: 'ASSIGN DRIVER', value: 2 },
  { label: 'SUCCESS', value: 3, hideTabs: true, hidden: true },
]

interface DeliveryOrderWizardNavProps
  extends Omit<React.ComponentProps<typeof StepWizardNav>, 'steps'> {}

const DeliveryOrderWizardNav: React.FC<DeliveryOrderWizardNavProps> = (
  props
) => {
  return <StepWizardNav {...props} steps={STEPS} />
}

export default DeliveryOrderWizardNav
