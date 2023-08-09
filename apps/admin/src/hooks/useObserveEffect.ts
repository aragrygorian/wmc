import { isFunction } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'
import useAfterMountEffect from './useAfterMountEffect'

export interface UseObserveEffectOptions {
  name: string
  observedFields?: Array<string>
  getValue?: (values: Array<any>) => string | number
  formContext?: ReturnType<typeof useFormContext>
}

const useObserveEffect = (options: UseObserveEffectOptions) => {
  const { name, observedFields = [], getValue, formContext } = options
  const { control, setValue } = formContext

  const observedFieldValues = useWatch({ control, name: observedFields })
  const value = getValue?.(observedFieldValues)
  const shouldSetValue = isFunction(getValue)

  useAfterMountEffect(() => {
    if (shouldSetValue) setValue(name, value)
  }, [shouldSetValue, value])

  return { value, observedValues: observedFieldValues }
}

export default useObserveEffect
