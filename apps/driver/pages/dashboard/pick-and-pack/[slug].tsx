import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import useGetPickAndPackDetails from '@driver/modules/PickAndPack/hooks/useGetPickAndPackDetails'
import {
  PickAndPack,
  PickAndPackStatus,
} from '@driver/modules/PickAndPack/types'
import { updatePickAndPackStatus } from '@driver/modules/PickAndPack/utils/updatePickAndPack'
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
import React, { Fragment, useState } from 'react'
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
  pickAndPack?: PickAndPack | null
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
  } = { ...deliveryOrder } // Spread is used as deliveryOrder is nullable
  const { title: projectTitle } = { ...project }
  return [
    {
      title: 'Pick and Pack No.',
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
      title: 'Delivery Date',
      description: dayjs(pickUpAt).format('DD MMM YYYY'),
    },
  ]
}

const PickAndPackDetailPage: NextPage = () => {
  /* Data */
  const pickAndPack = useGetPickAndPackDetails()

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
  const [collapseState, setCollapseState] = useState<Record<string, boolean>>(
    {}
  )
  const handleCollapseOnClick = (id: string) => {
    setCollapseState({
      ...collapseState,
      [id]: !isUndefined(collapseState[id]) ? !collapseState[id] : true,
    })
  }

  /* Update Pick & Pack */
  /** Update status of current pick and pack to Completed and redirect to landing page. */
  const handleCollectedOnClick = async () => {
    // Update status
    if (isNil(pickAndPack)) return
    try {
      const { error } = await updatePickAndPackStatus(
        PickAndPackStatus.Completed,
        pickAndPack.id
      )
      // If error
      if (!isNull(error)) throw Error

      // Success -> Redirect to landing page
      Router.push(`${routes.PICK_AND_PACK_LANDING_PAGE}/${pickAndPack.slug}`)
    } catch (err) {
      // Fail -> Print error
      toast.error(err)
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
          {map(createPickAndPackTableItems(pickAndPack), (item) => (
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
            key="collected-action-footer-button"
            sx={{ width: '100%', color: 'primary.contrastText', border: 0 }}
            variant="contained"
            onClick={handleCollectedOnClick}
          >
            COLLECTED
          </Button>,
        ]}
      />
    </DashboardLayout>
  )
}

export default PickAndPackDetailPage
