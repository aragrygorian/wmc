import React from 'react'
import StepWizard, { StepWizardProps } from 'react-step-wizard'
import ProgressiveClaimWizardNav from './ProgressiveClaimWizardNav'

interface ProgressiveClaimWizardProps
  extends Omit<Partial<StepWizardProps>, 'instance'> {
  instance: (wizard: any) => void // TODO: Fix typing
}

const ProgressiveClaimWizard: React.FC<ProgressiveClaimWizardProps> = (
  props
) => {
  const { children, ...rest } = props
  return (
    <StepWizard nav={<ProgressiveClaimWizardNav />} {...rest}>
      {children}
    </StepWizard>
  )
}

export default ProgressiveClaimWizard
