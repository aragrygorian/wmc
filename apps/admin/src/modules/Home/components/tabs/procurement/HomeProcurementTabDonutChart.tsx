import React from 'react'
import Chart from '@admin/components/Chart'
import { sum } from 'lodash'
import { alpha } from '@mui/material'
import { useTheme } from '@mui/system'

interface HomeProcurementTabDonutChartProps {
  colors: string[]
  labels: string[]
  series: (number | string)[]
}

const HomeProcurementTabDonutChart: React.FC<
  HomeProcurementTabDonutChartProps
> = (props) => {
  const { colors, labels, series } = props

  const theme = useTheme()

  return (
    <Chart
      options={{
        colors,
        labels,
        chart: { toolbar: { show: false } },
        dataLabels: { enabled: false },
        grid: {
          show: false,
        },
        stroke: {
          colors: [
            theme.palette.mode === 'light'
              ? theme.palette.background.paper
              : theme.palette.neutral[800],
          ],
          width: 4,
        },
        legend: {
          position: 'bottom',
          labels: {
            colors: [theme.palette.text.primary, theme.palette.text.primary],
          },
          formatter: (status, options) => [
            status,
            `(${options.w.globals.series[options.seriesIndex]})`,
          ],
        },
        xaxis: {
          labels: {
            style: { colors: theme.palette.text.primary },
          },
        },
        yaxis: {
          labels: {
            style: { colors: theme.palette.text.primary },
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  color: alpha(theme.palette.text.primary, 0.9),
                  show: true,
                },
                total: {
                  color: alpha(theme.palette.text.primary, 0.8),
                  show: true,
                },
                value: {
                  color: theme.palette.text.primary,
                  show: true,
                  formatter: () => sum(series),
                },
              },
            },
          },
        },
      }}
      series={series}
      type="donut"
      height={350}
    />
  )
}

export default HomeProcurementTabDonutChart
