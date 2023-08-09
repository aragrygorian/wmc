import {
  Product as PrismaProduct,
  ProgressiveClaim as PrismaProgressiveClaim,
  ProgressiveClaimLine as PrismaProgressiveClaimLine,
  SalesOrderLine as PrismaSalesOrderLine,
} from '@prisma/client'

export interface ProgressiveClaimLine extends PrismaProgressiveClaimLine {
  invoice: PrismaProgressiveClaim
  product: PrismaProduct
  sales_order_line: PrismaSalesOrderLine
}

export interface ProgressiveClaim extends PrismaProgressiveClaim {
  lines: ProgressiveClaimLine[]
}
