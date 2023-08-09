import React from 'react'
import Chart from '@admin/components/Chart'
import { useFetchQuotations } from '@admin/modules/Quotation/hooks/useFetchQuotations'
import useUser from '@admin/app/useUser'
import dayjs from 'dayjs'
import { extend, filter, groupBy, mapValues, partialRight, sumBy } from 'lodash'
import { printAmount } from '@gravis-os/utils'
import { useTheme } from '@mui/system'
import { Box, Card, Chip, Stack, Typography } from '@gravis-os/ui'
import { isBetweenOneYear } from '@admin/modules/Home/utils/isBetweenOneYear'
import { getSubtotalFromLine } from '@admin/modules/Quotation/utils'
import { Quotation } from '@admin/modules/Quotation/types'
import getProductCostFromLine from '../../../../Quotation/utils/getProductCostFromLine'

interface HomeSalesTabChartProps {}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getMarginFromQuotations = (quotations: Quotation[]) => {
  const totalProductCost = sumBy(quotations, (quotation) =>
    sumBy(quotation?.lines, getProductCostFromLine)
  )

  const total = sumBy(quotations, (quotation) =>
    sumBy(quotation?.lines, getSubtotalFromLine)
  )

  return total - totalProductCost
}

const HomeSalesTabChart: React.FC<HomeSalesTabChartProps> = () => {
  const theme = useTheme()

  const { dbUser } = useUser()

  const { data: quotations = [] } = useFetchQuotations(
    {
      select: '*, lines:quotation_line(*, product(*, brand(*)))',
      match: {
        assignee_id: dbUser?.id,
      },
    },
    {
      select: partialRight(filter, (quotation) =>
        isBetweenOneYear(quotation?.published_at ?? '')
      ),
    }
  )

  const quotationsByMonth = extend(
    {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
    },
    groupBy(quotations, (quotation) => dayjs(quotation.published_at).month())
  )

  const quotationsTotalByMonth = mapValues(quotationsByMonth, (values) =>
    sumBy(values, 'total')
  )

  const marginTotalByMonth = mapValues(quotationsByMonth, (values) =>
    getMarginFromQuotations(values)
  )

  return (
    <Card>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box>
          <Typography variant="h4">Total Quotations</Typography>
          <Typography variant="body1" color="text.secondary">
            Value of quotations raised
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <div>
              <Chip
                size="small"
                color="success"
                title="+$621.26 (8.21%)"
                sx={{ mb: 0.5 }}
              />
            </div>
            <div>
              <Typography variant="overline" color="text.secondary">
                Total Value
              </Typography>
              <Typography variant="h3">
                {printAmount(sumBy(quotations, 'total'), { dp: 0 })}
              </Typography>
            </div>
          </Stack>
        </Box>
      </Stack>

      <Chart
        options={{
          chart: { toolbar: { show: false } },
          dataLabels: { enabled: false },
          grid: {
            show: false,
          },
          tooltip: {
            theme: theme.palette.mode,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 0, 100],
            },
          },
          labels: {
            colors: [theme.palette.text.primary],
          },
          legend: {
            labels: {
              colors: [theme.palette.text.primary, theme.palette.text.primary],
            },
          },
          xaxis: {
            labels: {
              formatter: (value) => MONTHS[value],
              style: { colors: theme.palette.text.primary },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => printAmount(value, { dp: 0 }),
              style: { colors: theme.palette.text.primary },
            },
          },
        }}
        series={[
          {
            data: Object.entries(quotationsTotalByMonth).map(
              ([key, value]) => ({
                x: key,
                y: value,
              })
            ),
            name: 'Quotation',
          },
          {
            data: Object.entries(marginTotalByMonth).map(([key, value]) => ({
              x: key,
              y: value,
            })),
            name: 'Margin',
          },
        ]}
        xaxis={{
          type: 'datetime',
        }}
        type="area"
        height={350}
      />
    </Card>
  )
}

export default HomeSalesTabChart
