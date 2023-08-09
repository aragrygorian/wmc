import { ListCardItemProps } from '@gravis-os/ui'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { DeliveryInstruction as PrismaPickAndPack } from '@prisma/client'
import { routes } from '@warehouse/app/routes'
import {
  PickAndPackStatus,
  PICK_AND_PACK_STATUS_QUERY_KEY,
} from '@warehouse/modules/PickAndPack/constants'
import { isEqual, size } from 'lodash'
import Router from 'next/router'
import React from 'react'

/**
 * Function used to generate ListCardProps for given pick and packs.
 *
 * @param pickAndPacks List of pick and packs pick and packs.
 * @returns List of card item props.
 */
export const getListCardItemsFromPickAndPacks = (
  pickAndPacks: PrismaPickAndPack[],
  status: PickAndPackStatus
): ListCardItemProps[] => {
  const numberOfProcessingPickAndPacks = size(pickAndPacks)
  return [
    {
      key: `${numberOfProcessingPickAndPacks}-pick-and-packs`,
      title: `${numberOfProcessingPickAndPacks} ${
        isEqual(numberOfProcessingPickAndPacks, 1)
          ? 'Pick and Pack'
          : 'Pick and Packs'
      }`,
      icon: <PostAddIcon />,
      onClick: () => {
        Router.push({
          pathname: routes.PICK_AND_PACK,
          query: {
            [PICK_AND_PACK_STATUS_QUERY_KEY]: status,
          },
        })
      },
    },
  ]
}
