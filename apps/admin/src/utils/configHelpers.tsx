import { FormSectionFieldProps, FormSectionProps } from '@gravis-os/form'
import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { isEqual, startCase } from 'lodash'

export const createGeneralFilterFormSection = (
  fields: FormSectionProps['fields']
): FormSectionProps => {
  return {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up details',
    icon: <BallotOutlinedIcon />,
    fields,
  }
}

export const createMinMaxAmountFilterField = (
  filterKey: string
): FormSectionFieldProps[] => {
  return Array.from({ length: 2 }).map((item, i) => {
    const filterType = isEqual(i, 0) ? 'min' : 'max'
    const op = isEqual(i, 0) ? 'gte' : 'lte'
    return {
      key: `${filterType}_${filterKey}`,
      name: `${filterType}_${filterKey}`,
      label: `${startCase(filterType)} ${startCase(filterKey)}`,
      type: 'amount',
      filterKey,
      op,
    }
  })
}
