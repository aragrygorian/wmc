import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const isBetweenOneYear = (date: Date | string) =>
  dayjs(date).isBetween(
    dayjs().subtract(1, 'year'),
    dayjs().add(1, 'month'),
    'month'
  )
