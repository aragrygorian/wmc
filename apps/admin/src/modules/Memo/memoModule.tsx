import React from 'react'
import dynamic from 'next/dynamic'
import { routes } from '@admin/app/routes'

const BallotOutlinedIcon = dynamic(
  () => import('@mui/icons-material/BallotOutlined'),
  { ssr: false }
)

export const memoModule = {
  Icon: BallotOutlinedIcon,
  sk: 'id',
  table: {
    name: 'memo',
  },
  name: {
    singular: 'Memo',
    plural: 'Memos',
  },
  select: {
    list: '*, contact(*), project(*), user(*)',
    detail: '*, contact(*), project(*), user(*)',
  },
  route: {
    plural: routes.MEMOS,
  },
}
