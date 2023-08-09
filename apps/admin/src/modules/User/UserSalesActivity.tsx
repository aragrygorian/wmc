import React from 'react'
import { useList } from '@gravis-os/query'
import { memoModule } from '@admin/modules/Memo'
import { MemoTimeline } from '@gravis-os/apps/crm'
import { User as PrismaUser } from '@prisma/client'

export interface UserSalesActivityProps {
  user: PrismaUser
}

const UserSalesActivity: React.FC<UserSalesActivityProps> = (props) => {
  const { user } = props

  // List Memos Query
  const onUseListMemos = useList({
    module: memoModule,
    order: ['created_at', { ascending: false }],
    limit: 6,
    match: { user_id: user?.id },
    disableWorkspacePlugin: true,
    queryOptions: { enabled: Boolean(user?.id) },
  })
  const { items: memos } = onUseListMemos

  return <MemoTimeline items={memos} queryResult={onUseListMemos} />
}

export default UserSalesActivity
