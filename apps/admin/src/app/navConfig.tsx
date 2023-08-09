import React from 'react'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { NavConfig } from '@admin/app/types'
import { accountsPayableModule } from '@admin/modules/SupplierInvoice/AccountsPayable/accountsPayableModule'
import { accountsReceivableModule } from '@admin/modules/Invoice/AccountsReceivable/accountsReceivableModule'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { orderFormModule } from '../modules/OrderForm/orderFormConfig'
import { serviceModule } from '../modules/Service/serviceConfig'
import { companyModule } from '../modules/Company/companyConfig'
import { projectModule } from '../modules/Project/projectConfig'
import productModule from '../modules/Product/productModule'
import { categoryModule } from '../modules/Category/categoryConfig'
import { contactModule } from '../modules/Contact'
import { currencyFactorModule } from '../modules/CurrencyFactor/currencyFactorConfig'
import { userModule } from '../modules/User/userConfig'
import { roleModule } from '../modules/Role/roleConfig'
import { permissionModule } from '../modules/Permission/permissionConfig'
import { warehouseModule } from '../modules/Warehouse/warehouseConfig'
import { salesOrderModule } from '../modules/SalesOrder/salesOrderConfig'
import purchaseOrderModule from '../modules/PurchaseOrder/purchaseOrderModule'
import { deliveryOrderModule } from '../modules/DeliveryOrder/deliveryOrderModule'
import invoiceModule from '../modules/Invoice/invoiceModule'
import { supplierInvoiceModule } from '../modules/SupplierInvoice/supplierInvoiceConfig'
import { creditNoteModule } from '../modules/CreditNote/creditNoteConfig'
import { debitNoteModule } from '../modules/DebitNote/debitNoteConfig'
import { goodsReturnNoteModule } from '../modules/GoodsReturnNote/goodsReturnNoteConfig'
import { loanFormModule } from '../modules/LoanForm/loanFormConfig'
import { projectGroupModule } from '../modules/ProjectGroup/projectGroupConfig'
import { deliveryInstructionModule } from '../modules/DeliveryInstruction/deliveryInstructionModule'
import progressiveClaimModule from '../modules/ProgressiveClaim/progressiveClaimModule'

const getMenuItemFromModule = (module): NavConfig => {
  const { table, name, route, Icon = LockOutlinedIcon } = module
  return {
    name: table.name,
    key: name.singular,
    title: name.plural,
    href: route.plural,
    startIcon: <Icon fontSize="small" />,
  }
}

const NAV_CONFIG: NavConfig[] = [
  getMenuItemFromModule(companyModule),
  getMenuItemFromModule(projectModule),
  getMenuItemFromModule(projectGroupModule),
  getMenuItemFromModule(productModule),
  getMenuItemFromModule(categoryModule),
  getMenuItemFromModule(serviceModule),
  getMenuItemFromModule(contactModule),
  {
    key: 'users',
    title: 'Users',
    startIcon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    items: [
      getMenuItemFromModule(userModule),
      getMenuItemFromModule(roleModule),
      getMenuItemFromModule(permissionModule),
    ],
  },
  getMenuItemFromModule(warehouseModule), // Location
  {
    key: 'transactions',
    title: 'Transactions',
    startIcon: <ReceiptOutlinedIcon fontSize="small" />,
    items: [
      getMenuItemFromModule(quotationModule),
      getMenuItemFromModule(progressiveClaimModule),
      getMenuItemFromModule(invoiceModule),
    ],
  },
  getMenuItemFromModule(salesOrderModule),
  getMenuItemFromModule(orderFormModule),
  getMenuItemFromModule(purchaseOrderModule),
  getMenuItemFromModule(deliveryOrderModule),
  {
    name: 'delivery_calendar',
    key: 'delivery_calendar',
    title: 'Delivery Calendar',
    href: '/dashboard/delivery-orders/calendar',
    startIcon: <CalendarTodayIcon fontSize="small" />,
  },
  getMenuItemFromModule(deliveryInstructionModule),
  {
    key: 'finance',
    title: 'Finance',
    startIcon: <AttachMoneyOutlinedIcon fontSize="small" />,
    items: [
      getMenuItemFromModule(creditNoteModule),
      getMenuItemFromModule(debitNoteModule),
      getMenuItemFromModule(supplierInvoiceModule),
      getMenuItemFromModule(accountsPayableModule),
      getMenuItemFromModule(accountsReceivableModule),
    ],
  },
  // Loan
  {
    key: 'loan',
    title: 'Loan',
    startIcon: <AccountBalanceOutlinedIcon fontSize="small" />,
    items: [
      getMenuItemFromModule(loanFormModule),
      getMenuItemFromModule(goodsReturnNoteModule),
    ],
  },
  // TODO: Reports
  {
    key: 'settings',
    title: 'Settings',
    startIcon: <SettingsOutlinedIcon fontSize="small" />,
    items: [getMenuItemFromModule(currencyFactorModule)],
  },
]

export default NAV_CONFIG
