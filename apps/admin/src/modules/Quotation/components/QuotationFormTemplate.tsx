import React, { useState } from 'react'
import {
  FormSection,
  FormSectionProps,
  FormSectionReadOnlyStack,
  FormSectionRenderReadOnlyProps,
} from '@gravis-os/form'
import {
  ApartmentOutlined,
  DeleteOutlineOutlined,
  EmailOutlined,
  LocalPrintshopOutlined,
  ModeEditOutlineOutlined,
  PhoneIphoneOutlined,
  SaveOutlined,
  TrendingUp,
} from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonProps,
  Card,
  ConfirmationDialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'
import { printAmount, printPercentage } from '@gravis-os/utils'
import Chart from '@admin/components/Chart'
import { sumBy, upperCase } from 'lodash'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import { SxProps } from '@mui/system'
import { QuotationLine } from '../types'
import { getSubtotalFromLine } from '../utils'
import getProductCostFromLine from '../utils/getProductCostFromLine'

const AddressReadOnlyFormSection: React.FC<{
  title?: React.ReactNode
  icon?: React.ReactElement
  item?: CrudItem
  prefix?: string
}> = (props) => {
  const { icon, title, item: injectedItem, prefix: injectedPrefix } = props

  const item = injectedItem

  const prefix = injectedPrefix ? `${injectedPrefix}_` : ''
  const cityCountryArray = [
    item?.[`${prefix}address_city`],
    item?.[`${prefix}address_country`],
  ].filter(Boolean)

  return (
    <Stack direction="row" alignItems="center" spacing={5}>
      <div>
        {title && (
          <Typography
            variant="subtitle1"
            color="primary"
            startIcon={icon}
            gutterBottom
          >
            {title}
          </Typography>
        )}

        <Typography variant="body2">
          {item?.[`${prefix}address_line_1`] || '-'}
        </Typography>
        <Typography variant="body2">
          {item?.[`${prefix}address_line_2`]}{' '}
          {item?.[`${prefix}address_postal_code`]}
        </Typography>
        <Typography variant="body2">{cityCountryArray.join(', ')}</Typography>
      </div>
    </Stack>
  )
}

const ContactReadOnlyFormSection: React.FC<FormSectionRenderReadOnlyProps> = (
  props
) => {
  const { label, title, value } = props

  return (
    <FormSectionReadOnlyStack title={title} label={label}>
      <Stack spacing={0.5}>
        <Typography
          spacing={1}
          variant="body2"
          startIcon={<PhoneIphoneOutlined color="primary" fontSize="small" />}
        >
          {value?.mobile}
        </Typography>

        <Typography
          spacing={1}
          variant="body2"
          startIcon={<EmailOutlined color="primary" fontSize="small" />}
        >
          {value?.email}
        </Typography>
      </Stack>
    </FormSectionReadOnlyStack>
  )
}

const MAX_ROW_TO_FIT_PAGE = 3

const QuotationFormTemplate: React.FC<any> = (props) => {
  const {
    formContext,
    onSubmit,
    onDelete,
    isReadOnly,
    setIsReadOnly,
    sections,
    item = {},
    actionButtons: injectedActionButtons = [],
    ...rest
  } = props

  const { isPrintMode, handlePrint } = usePdfPrint()

  const [showMargin, setShowMargin] = useState(false)

  const { lines } = item as { lines: QuotationLine[] }

  const totalProductCost = sumBy(lines, getProductCostFromLine)
  const totalSubtotal = sumBy(lines, getSubtotalFromLine)
  const absoluteProfitMargin = totalSubtotal - totalProductCost
  const relativeProfitMargin = absoluteProfitMargin / totalSubtotal

  if (!sections?.length) return null

  const formSectionProps = { isReadOnly, disableCard: true, item, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)
  const sectionKeys = [
    'assignee',
    'status',
    'title',
    'type',
    'published_at',
    'project',
    'company',
    'contact',
    'billing_address',
    'shipping_address',
    'total',
    'order',
    'lines',
    'notes',
    'attachments',
    'payment',
    'pricing',
  ]
  const sectionsPropsByKey: Record<string, FormSectionProps> =
    sectionKeys.reduce(
      (acc, key) => ({ ...acc, [key]: getSectionPropsByKey(key) }),
      {}
    )

  const actionButtons = [
    {
      key: 'edit',
      children: isReadOnly ? 'Edit' : 'Save',
      startIcon: isReadOnly ? <ModeEditOutlineOutlined /> : <SaveOutlined />,
      onClick: async () => {
        if (isReadOnly) return setIsReadOnly(!isReadOnly)

        await formContext.handleSubmit(async (values) => {
          await onSubmit(values)
          setIsReadOnly(true)
        })()
      },
      color: 'primary',
    },
    {
      key: 'print',
      children: 'Print',
      startIcon: <LocalPrintshopOutlined />,
      onClick: () =>
        handlePrint({
          filename: item?.title && `${item.slug.toUpperCase()}.pdf`,
        }),
    },
    <ConfirmationDialog
      buttonComponent={Button}
      buttonProps={{
        key: 'delete',
        children: 'Delete',
        startIcon: <DeleteOutlineOutlined />,
        tooltip: 'Delete',
        color: 'inherit',
      }}
      disableToastSuccess
      onConfirm={() => onDelete(item)}
    />,
    {
      key: 'margin',
      children: 'Margin',
      startIcon: <TrendingUp />,
      onClick: () => setShowMargin(!showMargin),
      color: 'primary',
    },
    ...injectedActionButtons,
  ].map((item) => ({ color: 'inherit' as ButtonProps['color'], ...item }))

  const containerSx: SxProps = isPrintMode
    ? {
        pt: 3,
        '& > .MuiCard-root': { background: 'none', boxShadow: 'none' },
        '& > div > .MuiCard-root': { background: 'none', boxShadow: 'none' },
      }
    : null

  const shouldPushToNewPage = lines?.length <= MAX_ROW_TO_FIT_PAGE

  return (
    <Stack spacing={2} sx={containerSx}>
      {/* Toolbar */}
      <Card
        square
        disableLastGutterBottom
        contentProps={{ sx: { py: 1, pl: 1, pr: 3 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
        >
          {/* Left */}
          <Stack
            display={isPrintMode ? 'none' : 'flex'}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            {actionButtons?.map((actionButton) => {
              const isReactElement = React.isValidElement(actionButton)
              if (isReactElement) return actionButton
              return <Button key={actionButton.key} {...actionButton} />
            })}
          </Stack>
          {/* Right */}
          <Box sx={{ width: '100%' }}>
            <Grid container>
              {/* Assignee */}
              {Boolean(sectionsPropsByKey.assignee) && (
                <FormSection
                  gridProps={{ xs: 6 }}
                  {...formSectionProps}
                  {...sectionsPropsByKey.assignee}
                />
              )}
              {/* Status */}
              {Boolean(sectionsPropsByKey.status) && (
                <FormSection
                  gridProps={{ xs: 6 }}
                  readOnlySx={{ textAlign: 'right' }}
                  {...formSectionProps}
                  {...sectionsPropsByKey.status}
                />
              )}
            </Grid>
          </Box>
        </Stack>
      </Card>

      {/* Margin */}
      {showMargin && (
        <Card disableBorderRadiusBottom>
          <Stack sx={{ flexDirection: 'row' }}>
            <Box sx={{ flexBasis: '50%' }}>
              <Typography
                variant="h5"
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  px: 1.5,
                  py: 2,
                }}
              >
                Profit Margin Breakdown
              </Typography>
              <Box sx={{ mt: 4, mx: 5 }}>
                <Chart
                  options={{
                    chart: { toolbar: { show: false } },
                    dataLabels: { enabled: false },
                    grid: {
                      show: false,
                    },
                    yaxis: {
                      labels: {
                        formatter: (value) => printAmount(value, { dp: 0 }),
                      },
                    },
                  }}
                  series={[
                    {
                      data: [{ x: '', y: totalProductCost }],
                      name: 'Product Cost',
                    },
                    {
                      data: [{ x: '', y: totalSubtotal }],
                      name: 'Product Subtotal',
                    },
                  ]}
                  type="bar"
                  height={250}
                />
              </Box>
            </Box>

            <Stack
              sx={{
                display: 'flex',
                flexBasis: '50%',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" sx={{ px: 1.5, py: 2 }}>
                Profit Margin Breakdown
              </Typography>
              <Stack
                sx={{
                  flexDirection: 'column',
                  flex: '1 1 100%',
                  justifyContent: 'space-between',
                }}
              >
                {[
                  {
                    label: 'Product Subtotal',
                    value: printAmount(totalSubtotal),
                    TypographyProps: { color: 'text.secondary' },
                  },
                  {
                    label: 'Product Cost',
                    value: printAmount(totalProductCost),
                    TypographyProps: { color: 'text.secondary' },
                  },
                  {
                    label: 'Gross Profit Margin (%)',
                    value: printPercentage(relativeProfitMargin),
                    TypographyProps: { color: '#4caf50' },
                  },
                  {
                    label: 'Gross Profit Margin ($)',
                    value: printAmount(absoluteProfitMargin),
                    TypographyProps: { color: '#4caf50' },
                  },
                ].map(({ label, value, TypographyProps }) => (
                  <Stack
                    sx={{
                      alignItems: 'center',
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      flexDirection: 'row',
                      flexGrow: 1,
                      p: 2.5,
                    }}
                  >
                    <Box sx={{ flexBasis: '40%' }}>
                      <Typography variant="body2">{label}</Typography>
                    </Box>
                    <Typography
                      fontWeight={500}
                      variant="body2"
                      {...TypographyProps}
                    >
                      {value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      )}
      {/* Paper */}
      <div>
        <Card disableBorderRadiusBottom>
          <Stack spacing={4}>
            {/* Header */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              {Boolean(sectionsPropsByKey.title) && (
                <FormSection
                  {...formSectionProps}
                  {...sectionsPropsByKey.title}
                />
              )}
              <Stack direction="row" spacing={6} sx={{ width: 'fit-content' }}>
                {Boolean(sectionsPropsByKey.type) && (
                  <FormSection
                    {...formSectionProps}
                    {...sectionsPropsByKey.type}
                  />
                )}
                {Boolean(sectionsPropsByKey.published_at) && (
                  <FormSection
                    {...formSectionProps}
                    {...sectionsPropsByKey.published_at}
                  />
                )}
              </Stack>
            </Stack>

            <Divider sx={{ '&&': { mt: 0 } }} />

            {/* Letter Head */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              <Grid container>
                <Grid item xs={isPrintMode ? 6 : 12} md={6}>
                  <Grid container spacing={5}>
                    {/* Project + Amount */}
                    {Boolean(sectionsPropsByKey.project) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.project}
                      />
                    )}
                    {/* Company */}
                    {Boolean(sectionsPropsByKey.company) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.company}
                      />
                    )}
                    {/* Contact */}
                    {Boolean(sectionsPropsByKey.contact) && (
                      <FormSection
                        renderReadOnly={(props) => (
                          <ContactReadOnlyFormSection {...props} />
                        )}
                        {...formSectionProps}
                        {...sectionsPropsByKey.contact}
                      />
                    )}
                    <Grid item>
                      <Grid container spacing={2}>
                        {/* Addresses */}
                        {Boolean(sectionsPropsByKey.shipping_address) && (
                          <FormSection
                            gridProps={{ xs: isPrintMode || 12, md: true }}
                            renderReadOnlySection={(props) => (
                              <AddressReadOnlyFormSection
                                prefix="shipping"
                                icon={<ApartmentOutlined fontSize="small" />}
                                title="Ship to"
                                {...props}
                              />
                            )}
                            {...formSectionProps}
                            {...sectionsPropsByKey.shipping_address}
                          />
                        )}
                        {Boolean(sectionsPropsByKey.billing_address) && (
                          <FormSection
                            gridProps={{ xs: isPrintMode || 12, md: true }}
                            renderReadOnlySection={(props) => (
                              <AddressReadOnlyFormSection
                                prefix="billing"
                                icon={<ApartmentOutlined fontSize="small" />}
                                title="Bill to"
                                {...props}
                              />
                            )}
                            {...formSectionProps}
                            {...sectionsPropsByKey.billing_address}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={0} md={1} />

                <Grid item xs={isPrintMode ? 6 : 12} md={5}>
                  <Grid container spacing={5}>
                    {/* Total */}
                    {Boolean(sectionsPropsByKey.total) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.total}
                      />
                    )}
                    {/* Order */}
                    {Boolean(sectionsPropsByKey.order) && (
                      <FormSection
                        readOnlySx={{ textAlign: 'right' }}
                        {...formSectionProps}
                        {...sectionsPropsByKey.order}
                      />
                    )}
                    {Boolean(sectionsPropsByKey.payment) && (
                      <FormSection
                        readOnlySx={{ textAlign: 'right' }}
                        {...formSectionProps}
                        {...sectionsPropsByKey.payment}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Card>

        {/* Document Lines */}
        <Box>
          {Boolean(sectionsPropsByKey.lines) && (
            <FormSection {...formSectionProps} {...sectionsPropsByKey.lines} />
          )}
        </Box>

        {isPrintMode && shouldPushToNewPage && (
          <Box sx={{ pageBreakAfter: 'always' }} />
        )}

        <Card disableBorderRadiusTop>
          {/* Summary */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Grid container>
              <Grid item xs={isPrintMode ? 6 : 12} md={6}>
                <Grid container spacing={4}>
                  {/* Notes */}
                  {Boolean(sectionsPropsByKey.notes) && (
                    <FormSection
                      gridProps={{ spacing: 4 }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.notes}
                    />
                  )}

                  {/* Attachments */}
                  {Boolean(sectionsPropsByKey.attachments) && (
                    <FormSection
                      {...formSectionProps}
                      {...sectionsPropsByKey.attachments}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid xs={0} md={2} />

              <Grid item xs={isPrintMode ? 6 : 12} md={4}>
                <Grid container>
                  {/* Pricing */}
                  {Boolean(sectionsPropsByKey.pricing) && (
                    <FormSection
                      readOnlySx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      gridProps={{ spacing: 0.5 }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.pricing}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </div>
    </Stack>
  )
}

export default QuotationFormTemplate
