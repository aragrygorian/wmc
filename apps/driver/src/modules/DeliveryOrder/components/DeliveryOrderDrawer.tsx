import useGetAllCompanies from '@driver/modules/Company/hooks/useGetAllCompanies'
import { Button, Drawer, DrawerProps, Stack, Typography } from '@gravis-os/ui'
import { SelectChangeEvent } from '@mui/material'
import { Company as PrismaCompany } from '@prisma/client'
import { map, toString } from 'lodash'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import DeliveryOrderSelectField from './DeliveryOrderSelectField'

export const enum DeliveryOrderFilterKey {
  Company = 'Company',
}

export interface DeliveryOrderFilterDrawerProps extends DrawerProps {
  filter?: Record<string, string>
  setFilter?: Dispatch<SetStateAction<Record<string, string>>>
  onSubmit?: () => void
}

/** Drawer component used primarily for filter function. */
const DeliveryOrderFilterDrawer: FC<DeliveryOrderFilterDrawerProps> = (
  props
) => {
  const {
    filter: injectedFilter,
    setFilter: injectedSetFilter,
    onSubmit = () => null,
    ...rest
  } = props

  /* Fetch Data */
  const companies: PrismaCompany[] = useGetAllCompanies()

  /* Filter items */
  const [filter, setFilter] = useState<Record<string, string>>(
    injectedFilter ?? {}
  )
  // Fallback
  const setFilterFunc = injectedSetFilter ?? setFilter

  const handleSelectOnChange = (e: SelectChangeEvent<unknown>, key: string) => {
    setFilterFunc({ ...filter, [key]: e.target.value as string })
  }

  return (
    <Drawer anchor="right" {...rest}>
      <Stack py={2} px={4} spacing={2}>
        <Typography variant="h4">Delivery Order Filter</Typography>
        <DeliveryOrderSelectField
          key={`delivery-order-select-${DeliveryOrderFilterKey.Company}}`}
          label={DeliveryOrderFilterKey.Company}
          value={filter[DeliveryOrderFilterKey.Company]}
          onChange={(e) =>
            handleSelectOnChange(e, DeliveryOrderFilterKey.Company)
          }
          items={map(companies, (company) => {
            const { id, title } = company
            return {
              key: toString(id),
              value: title,
              title,
            }
          })}
        />
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Drawer>
  )
}

export default DeliveryOrderFilterDrawer
