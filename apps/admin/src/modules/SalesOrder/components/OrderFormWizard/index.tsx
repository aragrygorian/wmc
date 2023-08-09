import React from 'react'
import StepWizard, { StepWizardProps } from 'react-step-wizard'
import OrderFormWizardNav from './OrderFormWizardNav'

interface OrderFormWizardProps
  extends Omit<Partial<StepWizardProps>, 'instance'> {
  instance: (wizard: any) => void // TODO: Fix typing
}

const OrderFormWizard: React.FC<OrderFormWizardProps> = (props) => {
  const { children, ...rest } = props
  return (
    <StepWizard nav={<OrderFormWizardNav />} {...rest}>
      {children}
    </StepWizard>
  )
}

export default OrderFormWizard
