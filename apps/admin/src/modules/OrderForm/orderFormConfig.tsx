import React from 'react'
import { routes } from '@admin/app/routes'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import map from 'lodash/map'
import UserCell from '../../components/UserCell'
import AgingCounter from '../../components/AgingCounter'
import getOrderFormStatusColor from './utils/getOrderFormStatusColor'
import { salesOrderModule } from '../SalesOrder/salesOrderConfig'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'
import { projectModule } from '../Project/projectConfig'
import { companyModule } from '../Company/companyConfig'
import { ORDER_FORM_STATUS_CONFIG } from './constants'
import { getAssigneeField } from '../../utils/getUserField'

export const orderFormFields = {
  assignee_id: getAssigneeField(),
  title: { key: 'title', name: 'title', type: 'input', required: true },
  description: { key: 'description', name: 'description', type: 'input' },
  sales_order_id: {
    key: 'sales_order_id',
    name: 'sales_order_id',
    label: 'SO Reference',
    type: 'model',
    module: salesOrderModule,
  },
  project_id: {
    key: 'sales_order_id',
    name: 'sales_order_id',
    label: 'Project Name',
    type: 'model',
    select: '*',
    module: projectModule,
  },
  company_id: {
    key: 'company_id',
    name: 'company_id',
    label: 'Supplier',
    type: 'model',
    module: companyModule,
  },
  status: {
    key: 'status',
    name: 'status',
    label: 'Status',
    type: 'select',
    options: map(ORDER_FORM_STATUS_CONFIG, 'values'),
  },
}

export const orderFormFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [orderFormFields.assignee_id],
  },
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [orderFormFields.title, orderFormFields.description],
  },
]

export const orderFormModule = {
  sk: 'slug',
  table: {
    name: 'order_form',
  },
  name: {
    singular: 'Order Form',
    plural: 'Order Forms',
  },
  route: {
    plural: routes.ORDER_FORMS,
  },
  select: {
    list: `*, 
          sales_order(*, project!project_id(*)), 
          company(*), 
          assignee:assignee_id(*),
          lines:order_form_line(
            purchase_order_line!order_form_line_id(
              purchase_order(title)
            )
          )`,
    detail: `*, 
            sales_order(*), 
            company(*), 
            assignee:assignee_id(*),
            lines:order_form_line(*, 
              order_form(*), 
              product:product_id(*), 
              reservation(*,
                warehouse_product(*,
                  warehouse(*)
                )
              ),
              purchase_order_line!order_form_line_id(*, 
                purchase_order(*),
                inventory(*)
              )
            )`,
  },
  Icon: ListAltOutlinedIcon,
}

export const orderFormFilterFormSections = [
  createGeneralFilterFormSection([
    orderFormFields.sales_order_id,
    orderFormFields.company_id,
    orderFormFields.status,
  ]),
]

export const orderFormColumnDefs = [
  { field: 'title', headerName: 'OF ID', minWidth: 100, maxWidth: 100 },
  {
    field: 'sales_order.title',
    headerName: 'SO Ref',
    pinned: 'left',
    minWidth: 140,
    maxWidth: 140,
  },
  { field: 'sales_order.project.title', headerName: 'Project Name' },
  { field: 'company.title', headerName: 'Supplier' },
  {
    field: 'assignee.email',
    headerName: 'Assignee',
  },
  {
    field: 'created_at',
    headerName: 'Aging',
    cellRenderer: AgingCounter,
    maxWidth: 100,
  },
  {
    field: 'due_at',
    headerName: 'Date Needed',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  { field: 'created_by', cellRenderer: ({ value }) => <UserCell id={value} /> },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'status',
    pinned: 'right',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell color={getOrderFormStatusColor(value)} label={value} />
    ),
  },
]

export const orderFormPreviewFormSections = orderFormFormSections
export const orderFormAddFormSections = orderFormFormSections
