import dynamic from 'next/dynamic'

const Chart: any = dynamic(() => import('react-apexcharts'), { ssr: false })

export default Chart
