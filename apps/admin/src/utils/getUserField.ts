import { userModule } from '@admin/modules/User/userConfig'
import { FormSectionFieldProps } from '@gravis-os/form'

const DEFAULT_USER_KEY = 'user_id'

export const getUserField = (
  options: Omit<FormSectionFieldProps, 'key' | 'name'> & { key?: string }
) => ({
  key: options?.key ?? DEFAULT_USER_KEY,
  name: options?.key ?? DEFAULT_USER_KEY,
  type: 'model',
  module: userModule,
  select: 'id, title, full_name',
  renderOption: ({ option }) => option.full_name ?? option.title,
  optionLabelKey: 'full_name',
  ...options,
})

export const getAssigneeField = () =>
  getUserField({ label: 'Select Assignee', key: 'assignee_id' })
