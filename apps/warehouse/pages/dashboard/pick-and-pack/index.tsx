import { BackButton, Card, Chip, Stack } from '@gravis-os/ui'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import { PICK_AND_PACK_STATUS_QUERY_KEY } from '@warehouse/modules/PickAndPack/constants'
import useGetAllPickAndPacks from '@warehouse/modules/PickAndPack/hooks/useGetAllPickAndPacks'
import { PickAndPack } from '@warehouse/modules/PickAndPack/types'
import dayjs from 'dayjs'
import { filter, isEqual, isNil, kebabCase, map } from 'lodash'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

/** Shows list of pick and packs for that day */
const PickAndPackPage: NextPage = () => {
  /* Router */
  const router = useRouter()
  const { query } = router
  const { [PICK_AND_PACK_STATUS_QUERY_KEY]: status } = query

  /* Data */
  const pickAndPacks: PickAndPack[] = filter(
    useGetAllPickAndPacks(),
    (pickAndPack) => isEqual(pickAndPack.status, status)
  )

  return (
    <DashboardLayout>
      <Stack p={2} spacing={2}>
        {/* Return Button */}
        <BackButton
          title={`Pick & Pack${!isNil(status) ? ` (${status})` : ''}`}
          href={routes.HOME}
          sx={{ left: 0, mr: 'auto' }}
        />
        {/* Pick and Packs */}
        <Card disablePadding sx={{ mt: 2 }}>
          <Table>
            {/* Head */}
            <TableHead
              sx={{
                backgroundColor: 'white',
                borderBottom: 0.5,
                borderColor: 'divider',
                // Override style
                '& .MuiTableCell-head': {
                  fontWeight: 700,
                },
              }}
            >
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Pick Up Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            {/* Body */}
            <TableBody>
              {map(pickAndPacks, (pickAndPack, index) => {
                const {
                  title,
                  pick_up_at: pickUpAt,
                  status,
                  slug,
                } = pickAndPack
                const processedDate = dayjs(pickUpAt).format('DD MMM YYYY')
                return (
                  <Link
                    href={`${routes.PICK_AND_PACK}/${slug}`}
                    key={`${kebabCase(title)}-${index}`}
                  >
                    <TableRow>
                      <TableCell>{title}</TableCell>
                      <TableCell>{processedDate}</TableCell>
                      <TableCell>
                        <Chip
                          title={status ?? '-'}
                          color="primary"
                          sx={{
                            backgroundColor: 'primary.dark',
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </Link>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </DashboardLayout>
  )
}

export default PickAndPackPage
