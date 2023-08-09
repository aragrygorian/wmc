import React from 'react'
import type { NextPage } from 'next'
import { PosPaymentList } from '@gravis-os/apps/pos'
import PosLayout from '@pos/layouts/PosLayout'

const PosPaymentPage: NextPage = () => {
  return (
    <PosLayout disableRightAside>
      <PosPaymentList />
    </PosLayout>
  )
}

export default PosPaymentPage
