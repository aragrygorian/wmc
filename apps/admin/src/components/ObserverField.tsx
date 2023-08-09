import React from 'react'
import useObserveEffect, {
  UseObserveEffectOptions,
} from '@admin/hooks/useObserveEffect'
import EditOrReadOnlyField, {
  EditOrReadOnlyFieldProps,
} from './EditOrReadOnlyField'

export interface ObserverFieldProps extends EditOrReadOnlyFieldProps {
  observedFields: UseObserveEffectOptions['observedFields']
  getValue: UseObserveEffectOptions['getValue']
}

/**
 * ObserverField has to be used within RHF's FormContext
 * @param props
 */
const ObserverField: React.FC<ObserverFieldProps> = (props) => {
  const { name, observedFields, getValue, formContext, ...rest } = props

  const { value } = useObserveEffect({
    name,
    observedFields,
    getValue,
    formContext,
  })

  return (
    <EditOrReadOnlyField
      name={name}
      value={value}
      formContext={formContext}
      {...rest}
    />
  )
}

export default ObserverField
