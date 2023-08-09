import React from 'react'
import type { NextPage } from 'next'
import { PosPaymentSuccess } from '@gravis-os/apps/pos'
import PosLayout from '@pos/layouts/PosLayout'

const PosSuccessPage: NextPage = () => {
  return (
    <PosLayout disableRightAside>
      <PosPaymentSuccess />
    </PosLayout>
  )
}

export default PosSuccessPage
