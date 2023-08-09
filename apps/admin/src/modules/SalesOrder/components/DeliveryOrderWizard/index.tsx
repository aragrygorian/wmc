import React from 'react'
import StepWizard, { StepWizardProps } from 'react-step-wizard'
import DeliveryOrderWizardNav from './DeliveryOrderWizardNav'

interface DeliveryOrderWizardProps
  extends Omit<Partial<StepWizardProps>, 'instance'> {
  instance: (wizard: any) => void // TODO: Fix typing
}

const DeliveryOrderWizard: React.FC<DeliveryOrderWizardProps> = (props) => {
  const { children, ...rest } = props

  return (
    <StepWizard nav={<DeliveryOrderWizardNav />} {...rest}>
      {children}
    </StepWizard>
  )
}

export default DeliveryOrderWizard
