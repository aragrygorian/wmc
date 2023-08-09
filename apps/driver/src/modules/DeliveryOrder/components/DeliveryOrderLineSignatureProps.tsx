import { TextField } from '@gravis-os/fields'
import {
  ActionFooter,
  ACTION_FOOTER_HEIGHT,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Image,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { CloseOutlined } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { isEmpty, isNil, kebabCase } from 'lodash'
import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'
import SignatureCanvas from 'react-signature-canvas'
import { deliveryOrderModule } from '../deliveryOrderConfig'

/**
 * Property of the DriverDeliveryOrderLineSignature component which contains data to be rendered in the component and functions to modify the injected values.
 *
 * @prop {string} receivedBy
 * @prop {Dispatch<SetStateAction<string>>} setReceivedBy
 * @prop {string} contactNumber
 * @prop {Dispatch<SetStateAction<string>>} setContactNumber
 * @prop {string} signatureImageUrl
 * @prop {Dispatch<SetStateAction<string>>} setSignatureImageUrl
 * @prop {() => void} onBack
 * @prop {() => void} onConfirm
 */
export interface DeliveryOrderLineSignatureProps {
  /** Value of the Received By field */
  receivedBy: string
  /** Function that modifies the receivedBy value */
  setReceivedBy: Dispatch<SetStateAction<string>>
  /** Value of the Contact Number field */
  contactNumber: string
  /** Function that modifies the contactNumber value */
  setContactNumber: Dispatch<SetStateAction<string>>
  /** Value of the Signature Image Url, updated when the signature submit button is clicked */
  signatureImageUrl: string
  /** Function that updates the injected value of the signatureImageUrl. This is used so that the parent component can obtain the value of the signatureImageUrl */
  setSignatureImageUrl: Dispatch<SetStateAction<string>>
  /** Function called when the back button is clicked. */
  onBack: () => void
  /** Function called when confirm button is clicked. */
  onConfirm: () => void
}

const SIGNATURE_BUCKET_NAME = 'public'

/**
 * Component that renders the signature section which contains signature modal and updates the value injected by the parent component which is the confirmation page.
 */
const DeliveryOrderLineSignature: React.FC<DeliveryOrderLineSignatureProps> = (
  props
): ReactElement => {
  const {
    receivedBy,
    setReceivedBy,
    contactNumber,
    setContactNumber,
    signatureImageUrl: signatureImageKey,
    setSignatureImageUrl: setSignatureImageKey,
    onBack,
    onConfirm,
  } = props

  /* Signature Modal */
  const [showSignatureModal, setShowSignatureModal] = useState<boolean>(false)

  /* Signature Pad */
  const [signaturePad, setSignaturePad] = useState<SignatureCanvas | null>(null)
  // URL of the fetched URL after signature image has been uploaded.
  const [fetchedSignatureImageUrl, setFetchedSingatureImageUrl] =
    useState<string>('')

  const [signatureLoading, setSignatureLoading] = useState(false)

  // Fetch uploaded image URL when the upload key changes.
  useEffect(() => {
    const fetchSignatureImage = async (signatureUrl: string) => {
      try {
        setSignatureLoading(true)
        const { data, error } = await supabaseClient.storage
          .from(SIGNATURE_BUCKET_NAME)
          .download(signatureUrl)
        if (error || !data)
          throw new Error('Failed to download signature image.')
        const url = URL.createObjectURL(data)
        if (url) {
          setFetchedSingatureImageUrl(url)
        }
      } catch (err) {
        toast.error(err.message)
      } finally {
        setSignatureLoading(false)
      }
    }
    if (!isEmpty(signatureImageKey)) {
      fetchSignatureImage(signatureImageKey)
    }
  }, [signatureImageKey])

  const handleSignatureSubmit = () => {
    signaturePad?.getTrimmedCanvas().toBlob(async (blob) => {
      try {
        /* Validate Signature */
        if (isNil(blob)) {
          throw new Error('Unable to save canvas image.')
        }
        if (isEmpty(receivedBy)) {
          throw new Error('Please fill up customer details before signing.')
        }

        /* Convert to File */
        const file = new File(
          [blob],
          `${kebabCase(
            receivedBy
          )}-${Date.now().toString()}-customer-signature.png`
        )

        /* Upload */
        setSignatureLoading(true)
        const filepath = `${deliveryOrderModule.table.name}/${file.name}`
        const { data, error } = await supabaseClient.storage
          .from(SIGNATURE_BUCKET_NAME)
          .upload(filepath, file)

        if (error || !data) {
          throw new Error('Error when uploading signature image.')
        }

        /* Save Data */
        const key = data.Key
        setSignatureImageKey(key)
      } catch (err) {
        toast.error(err.message)
      } finally {
        setShowSignatureModal(false)
        setSignatureLoading(false)
      }
    })
  }

  /** Function called when confirm button is clicked. */
  const handleSignatureConfirm = () => {
    /* Validation */
    try {
      if (
        isEmpty(receivedBy) ||
        isEmpty(contactNumber) ||
        isEmpty(signatureImageKey)
      ) {
        throw new Error('All fields must be filled.')
      }
      onConfirm()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <Stack spacing={2} p={2}>
        {/* Signature By Customer */}
        <Typography variant="h4">Signature By Customer</Typography>
        {/* Signature Information */}
        <Card>
          <Stack spacing={3}>
            <TextField
              sx={{ backgroundColor: 'white' }}
              onChange={(e: ChangeEvent) =>
                setReceivedBy((e.target as HTMLInputElement).value)
              }
              value={receivedBy}
              label="Received By"
            />
            <TextField
              sx={{ backgroundColor: 'white' }}
              onChange={(e: ChangeEvent) =>
                setContactNumber((e.target as HTMLInputElement).value)
              }
              value={contactNumber}
              label="Contact Number"
            />
            {/* Signature Image */}
            <Box
              display="flex"
              justifyContent="center"
              border={2}
              borderColor="lightgrey"
              minHeight={350}
              alignItems="center"
              onClick={() => setShowSignatureModal(true)}
              sx={{ borderStyle: 'dashed', cursor: 'pointer' }}
              position="relative"
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {isEmpty(fetchedSignatureImageUrl) ? (
                signatureLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography color="primary" variant="h4">
                    Signature
                  </Typography>
                )
              ) : (
                <Image
                  src={fetchedSignatureImageUrl}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </Box>
          </Stack>
        </Card>
        {/* Signature Modal */}
        <Modal
          open={showSignatureModal}
          onClose={() => setShowSignatureModal(false)}
        >
          <>
            <Card
              title={
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                >
                  <Typography variant="h3">Signature</Typography>
                  <IconButton onClick={() => setShowSignatureModal(false)}>
                    <CloseOutlined />
                  </IconButton>
                </Stack>
              }
              disableBorderRadiusBottom
              sx={{
                bottom: ACTION_FOOTER_HEIGHT,
                position: 'absolute',
                width: '100%',
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Sign Here</Typography>
                <Box
                  border={1}
                  height="60vh"
                  borderColor="text.disabled"
                  borderRadius={1}
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  {signatureLoading ? (
                    <CircularProgress />
                  ) : (
                    // SignatureCanvas component from react-signature-canvas library
                    <SignatureCanvas
                      canvasProps={{ style: { width: '100%', height: '100%' } }}
                      ref={(ref) => setSignaturePad(ref)}
                    />
                  )}
                </Box>
                <Typography
                  textAlign="right"
                  onClick={() => signaturePad?.clear()}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Clear
                </Typography>
              </Stack>
            </Card>
            <ActionFooter
              actions={[
                <Button
                  fullWidth
                  onClick={handleSignatureSubmit}
                  variant="contained"
                >
                  Submit
                </Button>,
              ]}
            />
          </>
        </Modal>
      </Stack>
      <ActionFooter
        actions={[
          <Button variant="muted" onClick={onBack}>
            Back
          </Button>,
          <Button variant="contained" onClick={handleSignatureConfirm}>
            Confirm
          </Button>,
        ]}
      />
    </>
  )
}

export default DeliveryOrderLineSignature
