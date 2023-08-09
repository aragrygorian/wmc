import { DeliveryOrderLine } from '@driver/modules/DeliveryOrder/types'
import { TextField } from '@gravis-os/fields'
import {
  ActionFooter,
  ACTION_FOOTER_PADDING,
  Box,
  Button,
  Card,
  QuantityCard,
  Stack,
  Typography,
} from '@gravis-os/ui'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Collapse,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import {
  assign,
  every,
  filter,
  includes,
  isEmpty,
  isEqual,
  kebabCase,
  lowerCase,
  map,
  some,
  subtract,
  toNumber,
  toString,
  values,
} from 'lodash'
import router from 'next/router'
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'

/**
 * Props used to display fields displayed when Collapse component in quantity delivered is expanded.
 *
 * @prop {reason} string
 * @prop {remark} string
 */
export interface DeliveryOrderLineCollapseProps {
  reason: string
  remark: string
}

/**
 * Props of the QuantityCardList component.
 *
 * @prop {DeliveryOrderLine[]} deliveryLines
 * @prop {Dispatch<SetStateAction<DeliveryOrderLine[]>>} setDeliveryLines
 * @prop {() => void} onContinue
 */
export interface DeliveryOrderLineQuantityCardListProps {
  /**
   * List of DeliveryOrderLine to be rendered as the quantity card component.
   * This value is the one modified.
   */
  deliveryLines: DeliveryOrderLine[]
  /** Function to modify the injected DeliveryOrderLine. */
  setDeliveryLines: Dispatch<SetStateAction<DeliveryOrderLine[]>>
  /** Function called to proceed to the next step. */
  onContinue: () => void
}

/** Component containing list of QuantityCards with search functionality */
const DeliveryOrderLineQuantityCardList: FC<
  DeliveryOrderLineQuantityCardListProps
> = (props): ReactElement => {
  const {
    deliveryLines: injectedDeliveryLines,
    setDeliveryLines: injectedSetDeliveryLines,
    onContinue,
  } = props

  // List of currently displayed deliveryLines. Primarily used for filter function.
  const [filteredDeliveryLines, setFilteredDeliveryLines] = useState<
    DeliveryOrderLine[]
  >(injectedDeliveryLines)

  // Mapping of DeliveryOrderLine.id -> hasError boolean.
  const [deliveryLineErrorMapping, setDeliveryLineErrorMapping] = useState<
    Record<string, boolean>
  >({})

  // Update delivery order lines on injected data change
  useEffect(() => {
    setFilteredDeliveryLines(injectedDeliveryLines)
  }, [injectedDeliveryLines])

  /* Search Feature */
  const [searchQuery, setSearchQuery] = useState<string>('')
  // Search on change
  useEffect(() => {
    if (searchQuery) {
      setFilteredDeliveryLines(
        filter(injectedDeliveryLines, (deliveryOrderLine) =>
          includes(
            lowerCase(deliveryOrderLine.product.model_code ?? '-'),
            lowerCase(searchQuery)
          )
        )
      )
    } else {
      // If no search query, reset all
      setFilteredDeliveryLines(injectedDeliveryLines)
    }
  }, [injectedDeliveryLines, searchQuery])

  /* Validation */
  const handleContinueButtonClick = () => {
    try {
      /** Mapping of error lines to be used to update the state of current error mappings. */
      const nextErrorLineMapping: Record<string, boolean> = {}
      /** Mapping of partial lines that would result in error e.g., when driver did not fill up reason and remark. */
      const nextPartialErrorLineMapping: Record<string, boolean> = {}
      /** List of boolean which indicates whether the line is valid or not. */
      const validity = map(injectedDeliveryLines, (line) => {
        const { id, quantity, delivered_quantity: deliveredQuantity } = line

        // If delivered quantity is empty, set the value of delivered quantity to quantity.
        // This can happen if driver did not modify the delivered value at all as the default value of the quantity card is set to quantity.
        const updatedQuantity = deliveredQuantity ?? quantity

        // Check if delivered quantity is higher or lower than quantity to be delivered. Ideally should be the same.
        const quantityLeftToBeDelivered = subtract(quantity, updatedQuantity)

        // When driver inputs delivered value higher than the quantity to be delivered, this should return error
        const isQuantityDeliveredHigher = quantityLeftToBeDelivered < 0
        assign(nextErrorLineMapping, { [id]: isQuantityDeliveredHigher })

        // When driver made a partial delivery, should not return error but mark as partially delivered.
        const isQuantityDeliveredLower = quantityLeftToBeDelivered > 0

        const isPartialValid =
          !isQuantityDeliveredLower ||
          (Boolean(line.reason) && Boolean(line.remark))
        assign(nextPartialErrorLineMapping, { [id]: !isPartialValid })

        return !isQuantityDeliveredHigher && isPartialValid
      })

      // Assign mapping to component state, used to pass the error state to child QuantityCard to display the error icon.
      setDeliveryLineErrorMapping(nextErrorLineMapping)

      // Check if quantity error existed, if yes, throw error
      if (some(values(nextErrorLineMapping))) {
        throw new Error(
          'Quantity delivered cannot be higher than the total product quantity.'
        )
      }

      // Check if partial error existed, if yes, throw error
      if (some(values(nextPartialErrorLineMapping))) {
        throw new Error(
          'Please fill up reason and remark for partial delivery.'
        )
      }

      if (every(validity)) onContinue()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <Stack spacing={2} p={2}>
        {/* Quantity Delivered */}
        <Typography variant="h4">Quantity Delivered</Typography>
        {/* Search Bar */}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <QrCodeScannerIcon />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: 'white' }}
          value={searchQuery}
          onChange={(e: ChangeEvent) =>
            setSearchQuery((e.target as HTMLInputElement).value)
          }
          placeholder="Search Items"
        />
        {/* Search Items */}
        <Stack spacing={1} pb={ACTION_FOOTER_PADDING} mb={2}>
          {/* Display QuantityCards or Empty */}
          {!isEmpty(filteredDeliveryLines) ? (
            map(filteredDeliveryLines, (line) => {
              const {
                id,
                product,
                quantity,
                delivered_quantity: deliveredQuantity,
                reason,
                remark,
              } = line
              const {
                model_code: modelCode,
                sku,
                title,
                avatar_src: avatarSrc,
              } = product

              // Function to be passed to child to modify the quantity
              const setIndividualDeliveryOrderQuantity = (value: string) =>
                injectedSetDeliveryLines(
                  map(injectedDeliveryLines, (injectedLine) =>
                    isEqual(injectedLine.id, id)
                      ? { ...injectedLine, delivered_quantity: toNumber(value) }
                      : injectedLine
                  )
                )

              const quantityCardProp = {
                key: `${id}-quantity-card`,
                id: toString(id),
                title: modelCode ? `#${modelCode}` : '-',
                quantity: toString(deliveredQuantity),
                setQuantity: setIndividualDeliveryOrderQuantity,
                subtitle: `SKU: ${sku ?? '-'}`,
                description: title ?? '-',
                imageSrc: avatarSrc
                  ? `/${avatarSrc}`
                  : '/static/no_image_found.jpeg',
                hasError: Boolean(deliveryLineErrorMapping[id]),
              }

              return (
                <Stack key={quantityCardProp.key}>
                  <QuantityCard {...quantityCardProp} />
                  {/* Collapse for Partial Delivery */}
                  <Collapse in={subtract(quantity, deliveredQuantity ?? 0) > 0}>
                    <Card>
                      <Stack spacing={2}>
                        {/* Quantity Not Delivered */}
                        <TextField
                          value={subtract(quantity, deliveredQuantity ?? 0)}
                          label="Quantity not delivered"
                          disabled
                        />
                        {/* Reason */}
                        <FormControl>
                          <InputLabel>Reason</InputLabel>
                          <Select
                            label="Reason"
                            value={reason ?? ''}
                            onChange={(e: SelectChangeEvent) =>
                              injectedSetDeliveryLines(
                                map(injectedDeliveryLines, (injectedLine) =>
                                  isEqual(injectedLine.id, id)
                                    ? {
                                        ...injectedLine,
                                        reason: e.target.value,
                                      }
                                    : injectedLine
                                )
                              )
                            }
                          >
                            {map(
                              ['Missing item', 'Damaged item', 'Wrong item'],
                              (reason) => (
                                <MenuItem
                                  key={`${kebabCase(reason)}-reason-option`}
                                  value={reason}
                                >
                                  {reason}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                        {/* Remark */}
                        <FormControl>
                          <TextField
                            value={remark}
                            label="Remark"
                            onChange={(e: ChangeEvent) =>
                              injectedSetDeliveryLines(
                                map(injectedDeliveryLines, (injectedLine) =>
                                  isEqual(injectedLine.id, id)
                                    ? {
                                        ...injectedLine,
                                        remark: (e.target as HTMLInputElement)
                                          .value,
                                      }
                                    : injectedLine
                                )
                              )
                            }
                            placeholder="Add remark"
                          />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Collapse>
                </Stack>
              )
            })
          ) : (
            <Box>
              <Typography textAlign="center">No products found</Typography>
            </Box>
          )}
        </Stack>
      </Stack>
      <ActionFooter
        actions={[
          <Button variant="muted" onClick={() => router.back()}>
            Cancel
          </Button>,
          <Button onClick={handleContinueButtonClick} variant="contained">
            Continue
          </Button>,
        ]}
      />
    </>
  )
}

export default DeliveryOrderLineQuantityCardList
