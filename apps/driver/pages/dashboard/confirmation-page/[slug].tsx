import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import DeliveryOrderLineQuantityCardList from '@driver/modules/DeliveryOrder/components/DeliveryOrderLineQuantityCardList'
import DeliveryOrderLineSignature from '@driver/modules/DeliveryOrder/components/DeliveryOrderLineSignatureProps'
import { DeliveryOrderStatus } from '@driver/modules/DeliveryOrder/constants'
import useGetDeliveryOrderDetails from '@driver/modules/DeliveryOrder/hooks/useGetDeliveryOrderDetails'
import {
  DeliveryOrder,
  DeliveryOrderLine,
} from '@driver/modules/DeliveryOrder/types'
import getDeliveryOrderLineRemainingQuantity from '@driver/modules/DeliveryOrder/utils/getDeliveryOrderLineRemainingQuantity'
import { updateDeliveryOrder } from '@driver/modules/DeliveryOrder/utils/updateDeliveryOrder'
import { updateDeliveryOrderLine } from '@driver/modules/DeliveryOrder/utils/updateDeliveryOrderLine'
import {
  Box,
  IconProgressBar,
  IconProgressBarItemProps,
  IconProgressBarItemStatus,
} from '@gravis-os/ui'
import CreateIcon from '@mui/icons-material/Create'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import { assign, every, filter, isEqual, isNil, map, subtract } from 'lodash'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

/** Constant of progress bar icons with title */
const progressBarIcons = [
  { icon: <ListOutlinedIcon />, title: 'Confirm' },
  { icon: <CreateIcon />, title: 'Sign' },
]

const DeliveryOrderConfirmationPage: NextPage = () => {
  /* Next Router */
  const router = useRouter()

  /* Fetch Data */
  const deliveryOrder = useGetDeliveryOrderDetails()

  /* Product Lines */
  const [deliveryLines, setDeliveryLines] = useState<DeliveryOrderLine[]>([])
  useEffect(() => {
    setDeliveryLines(
      map(
        filter(deliveryOrder?.lines, (line) =>
          Boolean(getDeliveryOrderLineRemainingQuantity(line))
        ),
        // Assign delivered_quantity to equal quantity by default.
        (line) => ({ ...line, delivered_quantity: line.quantity })
      )
    )
  }, [deliveryOrder])

  /* Signature Page */
  const [receivedBy, setReceivedBy] = useState<string>('')
  const [contactNumber, setContactNumber] = useState<string>('')
  const [signature, setSignature] = useState<string>('')

  /* Content Sections */
  const [currentStep, setCurrentStep] = useState<number>(0)
  const increaseStep = () => setCurrentStep(currentStep + 1)
  const decreaseStep = () => setCurrentStep(currentStep - 1)

  /** List of ordered progress bar status */
  const iconProgressBarStatus = [
    IconProgressBarItemStatus.Completed,
    IconProgressBarItemStatus.Current,
    IconProgressBarItemStatus.Default,
  ]
  /** List of icon progress bar items which relies on the current step. */
  const iconProgressBarItems: IconProgressBarItemProps[] = map(
    progressBarIcons,
    (item, i) => ({
      ...item,
      status: iconProgressBarStatus[subtract(i, currentStep) + 1],
    })
  )

  /** Function called to update delivery order and delivery order lines. */
  const handleConfirm = async () => {
    try {
      /* Valid -> Update Data */
      const currentTime = new Date()
      const differences: number[] = []
      // Update delivery order line.
      map(deliveryLines, async (line) => {
        differences.push(line.quantity - (line.delivered_quantity ?? 0))
        await updateDeliveryOrderLine(
          {
            delivered_quantity: line.delivered_quantity,
            remark: line.remark,
            reason: line.reason,
            updated_at: currentTime,
          },
          line.id
        )
      })

      /** Updated delivery order props. */
      const updatedProps: Partial<DeliveryOrder> = {
        updated_at: currentTime,
        received_by: receivedBy,
        customer_contact: contactNumber,
        signature_url: signature,
        delivered_on: currentTime,
      }

      if (every(differences, (difference) => isEqual(difference, 0))) {
        // Full delivery made -> Set status Delivered
        assign(updatedProps, {
          status: DeliveryOrderStatus.Delivered,
        })
      } else {
        // Partial delivery -> Set status DeliveredPartial
        assign(updatedProps, {
          status: DeliveryOrderStatus.DeliveredPartial,
        })
      }

      if (isNil(deliveryOrder)) {
        throw new Error('Invalid delivery order submitted.')
      }

      // Update delivery order.
      await updateDeliveryOrder(updatedProps, deliveryOrder.id)

      /* Navigate */
      router.push(`${routes.LANDING_PAGE}/${deliveryOrder?.slug}`)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const content: ReactElement[] = [
    <DeliveryOrderLineQuantityCardList
      deliveryLines={deliveryLines}
      setDeliveryLines={setDeliveryLines}
      onContinue={increaseStep}
    />,
    <DeliveryOrderLineSignature
      receivedBy={receivedBy}
      setReceivedBy={setReceivedBy}
      contactNumber={contactNumber}
      setContactNumber={setContactNumber}
      signatureImageUrl={signature}
      setSignatureImageUrl={setSignature}
      onBack={decreaseStep}
      onConfirm={handleConfirm}
    />,
  ]

  /** Function to render to content of the page based on the current state of the page using ConfirmationPageState */
  const renderContent = (): ReactElement => content[currentStep]

  return (
    <DashboardLayout>
      {/* Progress Bar */}
      <Box m={2}>
        <IconProgressBar items={iconProgressBarItems} />
      </Box>
      {/* Main Content Section */}
      {renderContent()}
      {/* Action Footer */}
    </DashboardLayout>
  )
}

export default DeliveryOrderConfirmationPage
