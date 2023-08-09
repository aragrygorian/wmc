import React from 'react'
import useObserveEffect, {
  UseObserveEffectOptions,
} from '@admin/hooks/useObserveEffect'
import { UseFormReturn } from 'react-hook-form'

interface ObserverProps {
  formContext: UseFormReturn
  name: string
  observedFields: UseObserveEffectOptions['observedFields']
  getValue: UseObserveEffectOptions['getValue']
}

const Observer: React.FC<ObserverProps> = (props) => {
  const { formContext, name, observedFields, getValue } = props

  useObserveEffect({ formContext, name, observedFields, getValue })

  return null
}

export default Observer
