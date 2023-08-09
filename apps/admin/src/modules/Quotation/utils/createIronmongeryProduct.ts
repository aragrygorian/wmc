import { QuotationIronmongeryProduct } from '../types'

const createIronmongeryProduct = (
  index: number
): QuotationIronmongeryProduct => {
  return {
    index,
    part_no: null,
    quantity: 1,
    discount_rate: 0,
    product: null,
  }
}

export default createIronmongeryProduct
