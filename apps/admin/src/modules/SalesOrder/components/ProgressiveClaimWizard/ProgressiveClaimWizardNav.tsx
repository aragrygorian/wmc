import React from 'react'
import StepWizardNav from 'src/components/StepWizardNav'

const STEPS = [
  { label: 'SELECT ITEMS', value: 1 },
  { label: 'SET A DATE', value: 2 },
  { label: 'SUCCESS', value: 3, hideTabs: true, hidden: true },
]

interface ProgressiveClaimWizardNavProps
  extends Omit<React.ComponentProps<typeof StepWizardNav>, 'steps'> {}

const ProgressiveClaimWizardNav: React.FC<ProgressiveClaimWizardNavProps> = (
  props
) => {
  return <StepWizardNav {...props} steps={STEPS} />
}

export default ProgressiveClaimWizardNav
