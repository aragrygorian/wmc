/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
  '@workmetric/driver',
  '@workmetric/warehouse',
])

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/_api/print-pdf',
        destination: `${process.env.PRINT_PDF_URL}/api/print`,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
