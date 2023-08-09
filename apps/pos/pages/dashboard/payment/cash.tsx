import React from 'react'
import type { NextPage } from 'next'
import { PosPaymentCash } from '@gravis-os/apps/pos'
import PosLayout from '@pos/layouts/PosLayout'

const PosPaymentCashPage: NextPage = () => {
  return (
    <PosLayout disableRightAside>
      <PosPaymentCash />
    </PosLayout>
  )
}

export default PosPaymentCashPage
