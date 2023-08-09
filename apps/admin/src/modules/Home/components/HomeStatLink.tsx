import React from 'react'
import NextLink from 'next/link'
import { Card, Link, Stack, Typography } from '@gravis-os/ui'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const HomeStatLink = (props) => {
  const { children, href, startIcon } = props

  return (
    <Card sx={{ '& .MuiCardContent-root:last-child': { pb: 2 } }}>
      <NextLink href={href} passHref>
        <Link
          color="inherit"
          variant="subtitle2"
          sx={{
            alignItems: 'center',
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'space-between',
            opacity: 0.8,
            '&:hover': { textDecoration: 'none' },
          }}
        >
          <Stack sx={{ alignItems: 'center', flexDirection: 'row', gap: 1.5 }}>
            {/* {startIcon} */}
            {React.cloneElement(startIcon, { sx: { color: 'grey.500' } })}
            <Typography color="inherit" sx={{ mr: 1 }} variant="subtitle2">
              {children}
            </Typography>
          </Stack>
          <ArrowForwardIcon fontSize="small" sx={{ color: 'grey.500' }} />
        </Link>
      </NextLink>
    </Card>
  )
}

export default HomeStatLink
