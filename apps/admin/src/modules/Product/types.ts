import { Product as PrismaProduct } from '@prisma/client'
import { Brand } from '../Brand/types'

export interface Product extends PrismaProduct {
  brand: Brand
}
