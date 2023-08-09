import {
  ActionFooter,
  ACTION_FOOTER_PADDING,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@gravis-os/ui'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PostAddIcon from '@mui/icons-material/PostAdd'
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import { PickAndPackStatus } from '@warehouse/modules/PickAndPack/constants'
import useGetPickAndPackDetails from '@warehouse/modules/PickAndPack/hooks/useGetPickAndPackDetails'
import { PickAndPack } from '@warehouse/modules/PickAndPack/types'
import { updatePickAndPackStatus } from '@warehouse/modules/PickAndPack/utils/updatePickAndPack'
import getUserNameOrTitle from '@warehouse/modules/User/utils/getUserNameOrTitle'
import dayjs from 'dayjs'
import {
  capitalize,
  filter,
  isNil,
  isNull,
  isUndefined,
  kebabCase,
  map,
} from 'lodash'
import { NextPage } from 'next'
import Router from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

/** Represents a row of pick and pack information */
interface PickAndPackTableItem {
  /** Key of the information */
  title: string
  /** Value of the information */
  description: string
}

/** Represents the pick and pack product lines */
interface PickAndPackProduct {
  part: string
  name: string
  quantity: number
  note?: string
}

/**
 * Function used to extract information from the fetched pick and pack and format it as a table item.
 * @param pickAndPack List of PickAndPackTableItems to be used in the rendered Pick And Pack card.
 */
const createPickAndPackTableItems = (
  pickAndPack?: PickAndPack | null,
  createdBy?: string | null
): PickAndPackTableItem[] => {
  if (isNil(pickAndPack)) return []
  const {
    title,
    delivery_order: deliveryOrder,
    pick_up_at: pickUpAt,
  } = pickAndPack
  const {
    driver_name: driverName,
    driver_contact: driverContact,
    project,
  } = deliveryOrder || {}
  const { title: projectTitle } = { ...project }
  return [
    {
      title: 'Delivery Instruction No.',
      description: title,
    },
    {
      title: 'Driver',
      description: driverName ?? '-',
    },
    {
      title: 'Project',
      description: projectTitle ?? '-',
    },
    {
      title: 'Contact No.',
      description: driverContact ?? '-',
    },
    {
      title: 'Created By',
      description: createdBy ?? '-',
    },
    {
      title: 'Delivery Date',
      description: dayjs(pickUpAt).format('DD MMM YYYY'),
    },
  ]
}

/** Renders a specific pick and pack */
const PickAndPackDetailPage: NextPage = () => {
  /* Data */
  const pickAndPack = useGetPickAndPackDetails()
  const [createdBy, setCreatedBy] = useState<string | null>(null)
  // Fetch user name for created_by field
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserNameOrTitle(pickAndPack?.created_by)
      setCreatedBy(fetchedUser)
    }
    fetchUser()
  }, [pickAndPack])

  /* Product Table */
  const productTableItems: PickAndPackProduct[] = filter(
    map(pickAndPack?.lines, (line) => ({
      part: line.product?.model_code ?? '-',
      name: line.product?.title ?? '-',
      quantity: line.quantity,
      note: line.note ?? '-',
    })),
    (pickAndPack) => Boolean(pickAndPack.quantity)
  )

  // Collapsibles
  /** Mapping of table row ID to collapsible state */
  const [collapseState, setCollapseState] = useState<Record<string, boolean>>(
    {}
  )
  const handleCollapseOnClick = (id: string) => {
    setCollapseState({
      ...collapseState,
      [id]: !isUndefined(collapseState[id]) ? !collapseState[id] : true,
    })
  }

  /** Updates pick and pack status to Ready for Collection. */
  const handlePreparedOnClick = async () => {
    if (!isNil(pickAndPack)) {
      const { error } = await updatePickAndPackStatus(
        PickAndPackStatus.ReadyForCollection,
        pickAndPack.id
      )
      // If no errors when updating, move to landing page
      if (isNull(error))
        Router.push(`${routes.LANDING_PAGE}/${pickAndPack.slug}`)
    } else {
      toast.error('Pick and Pack error not found.')
    }
  }

  return (
    <DashboardLayout>
      <Box pb={ACTION_FOOTER_PADDING}>
        {/* Main Information */}
        <Card
          disableLastGutterBottom
          disableBorderRadiusBottom
          disableBorderRadiusTop
          sx={{ backgroundColor: 'primary.dark' }}
        >
          <Stack spacing={1} direction="row" color="primary.contrastText">
            <PostAddIcon />
            <Typography variant="h4" color="primary.contrastText">
              Pick and Pack
            </Typography>
          </Stack>
          {/* Pick and Pack Information */}
          {map(createPickAndPackTableItems(pickAndPack, createdBy), (item) => (
            <Grid container sx={{ mt: 2 }} key={`table-item-${item.title}`}>
              <Grid item xs={5}>
                <Typography variant="body2" color="primary.contrastText">
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle2" color="primary.contrastText">
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Card>
        {/* Content outside colored card */}
        <Stack spacing={2} p={2}>
          {/* Status and last updated */}
          <Card disableLastGutterBottom>
            <Stack spacing={0.5}>
              <Typography variant="h4">
                Status: {capitalize(pickAndPack?.status ?? '-')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last updated
              </Typography>
              <Typography variant="body2">
                {dayjs(pickAndPack?.updated_at).format('DD MMM YYYY hh:mm a') ??
                  '-'}
              </Typography>
            </Stack>
          </Card>
          {/* Product Line */}
          <Card title="Items To Prepare" disablePadding>
            <Table>
              {/* Table Header */}
              <TableHead
                sx={{
                  backgroundColor: 'white',
                  borderBottom: 0.5,
                  borderColor: 'divider',
                }}
              >
                <TableRow>
                  <TableCell>Part #</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Qty</TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {map(productTableItems, (item) => {
                  const { part, name, quantity, note } = item
                  const key = kebabCase(name)
                  return (
                    <Fragment key={`${key}-table-item`}>
                      <TableRow>
                        <TableCell>{part}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{quantity}</TableCell>
                        {/* Table cell is used for tidy positioning */}
                        <TableCell>
                          <IconButton
                            onClick={() => handleCollapseOnClick(key)}
                          >
                            {collapseState[key] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={`${key}-collapse`}
                        sx={{
                          ...(collapseState[key] && {
                            borderBottom: 1,
                            borderColor: 'divider',
                          }),
                        }}
                      >
                        <TableCell colSpan={4} sx={{ p: 0, border: 0 }}>
                          <Collapse in={collapseState[key]}>
                            <Typography p={2}>{note}</Typography>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </Stack>
      </Box>
      <ActionFooter
        actions={[
          <Button
            key="prepared-action-footer-button"
            sx={{ width: '100%', color: 'primary.contrastText', border: 0 }}
            variant="contained"
            onClick={handlePreparedOnClick}
          >
            PREPARED
          </Button>,
        ]}
      />
    </DashboardLayout>
  )
}

export default PickAndPackDetailPage
