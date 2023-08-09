import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '../../../lib/useFetch'
import { Reservation } from '../types'
import reservationModule from '../reservationModule'

export const useFetchReservations = initUseFetch<Reservation>(reservationModule)

export const useFetchReservationCount = initUseFetchCount(reservationModule)
