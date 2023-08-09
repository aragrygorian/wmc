import { CrudModule } from '@gravis-os/types'

export const getQueryKey =
  (module: CrudModule) =>
  (pageType: 'detail' | 'list') =>
  (options: Record<string, unknown>) =>
    [module.table.name, pageType, options]

export const getListQueryKey = (module: CrudModule) =>
  getQueryKey(module)('list')

export const getDetailQueryKey = (module: CrudModule) =>
  getQueryKey(module)('detail')
