import { Project } from '@admin/modules/Project/types'
import { User } from '@admin/modules/User/types'
import {
  Company,
  Contact,
  Quotation as PrismaQuotation,
  QuotationLine as PrismaQuotationLine,
} from '@prisma/client'
import { Product } from '../Product/types'

export interface QuotationLine extends PrismaQuotationLine {
  product: Product
}

export interface Quotation extends PrismaQuotation {
  lines?: QuotationLine[]
  assignee?: User
  project?: Project
  company?: Company
  contact?: Contact
}

export interface QuotationIronmongeryProduct {
  index: number
  part_no: string
  quantity: number
  discount_rate: number
  product: Product
}

export interface QuotationIronmongeryRoom {
  id: string
  doorLocation: string
  quantity: number
  width: number
  thickness: number
  height: number
  door: string
  doorType: string
  doorMaterial: string
  doorHardware: string
  products?: QuotationIronmongeryProduct[]
}
