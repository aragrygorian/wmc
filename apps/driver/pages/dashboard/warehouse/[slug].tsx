import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import { PickAndPackStatus } from '@driver/modules/PickAndPack/types'
import useGetWarehouseDetails from '@driver/modules/Warehouse/hooks/useGetWarehouseDetails'
import { BackButton, Card, Chip, Stack } from '@gravis-os/ui'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { DeliveryInstruction as PrismaPickAndPack } from '@prisma/client'
import dayjs from 'dayjs'
import { filter, isEqual, kebabCase, map } from 'lodash'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const WarehousePage: NextPage = () => {
  /* Data */
  const warehouse = useGetWarehouseDetails()
  const { pick_and_packs: pickAndPacks } = warehouse || {}
  const validPickAndPacks: PrismaPickAndPack[] = filter(
    pickAndPacks,
    (pickAndPack) =>
      isEqual(pickAndPack.status, PickAndPackStatus.ReadyForCollection)
  )

  return (
    <DashboardLayout>
      <Stack p={2} spacing={2}>
        {/* Return Button */}
        <BackButton
          title={`Pick Up - ${warehouse?.title}`}
          href={routes.HOME}
          sx={{ left: 0, mr: 'auto' }}
        />
        {/* Pick and Packs */}
        <Card disablePadding>
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
                <TableCell>DI ID</TableCell>
                <TableCell>Pick up Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            {/* Body */}
            <TableBody>
              {map(validPickAndPacks, (pickAndPack, index) => {
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

export default WarehousePage
