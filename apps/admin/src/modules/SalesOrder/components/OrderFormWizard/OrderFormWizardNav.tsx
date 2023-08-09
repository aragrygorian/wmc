import React from 'react'
import StepWizardNav from 'src/components/StepWizardNav'

const STEPS = [
  { label: 'SELECT ITEMS', value: 1 },
  { label: 'SET A DATE', value: 2 },
  { label: 'SUCCESS', value: 3, hideTabs: true, hidden: true },
]

interface OrderFormWizardNavProps
  extends Omit<React.ComponentProps<typeof StepWizardNav>, 'steps'> {}

const OrderFormWizardNav: React.FC<OrderFormWizardNavProps> = (props) => {
  return <StepWizardNav {...props} steps={STEPS} />
}

export default OrderFormWizardNav
