import { Box, Image } from '@gravis-os/ui'
import { Typography } from '@mui/material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export interface SignatureFieldProps {
  url: string
}

const SignatureField: React.FC<SignatureFieldProps> = (
  props
): React.ReactElement => {
  const { url } = props
  const [signatureUrl, setSignatureUrl] = useState('')
  useEffect(() => {
    const fetchSignatureImage = async () => {
      try {
        const { data, error } = await supabaseClient.storage
          .from('public')
          .download(url)
        if (error || !data) throw new Error('Error fetching signature image.')
        const imageUrl = URL.createObjectURL(data)
        if (imageUrl) setSignatureUrl(imageUrl)
      } catch (err) {
        toast.error(err.message)
      }
    }
    if (url) fetchSignatureImage()
  }, [url])
  return (
    <Box
      sx={{
        p: 2,
        borderColor: 'grey',
        borderRadius: 2,
        display: 'flex',
        maxWidth: 250,
        minHeight: 150,
        justifyContent: 'center',
        right: 0,
        ml: 'auto',
        my: 2,
        border: 1,
        alignItems: 'center',
        borderStyle: 'dashed',
      }}
    >
      {url ? (
        <Image src={signatureUrl} layout="fill" objectFit="contain" />
      ) : (
        <Typography color="primary" variant="h4">
          Signature
        </Typography>
      )}
    </Box>
  )
}

export default SignatureField
