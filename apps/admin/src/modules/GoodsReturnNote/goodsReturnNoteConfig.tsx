import React from 'react'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { routes } from '@admin/app/routes'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import GoodsReturnNoteLinesFieldArray from '@admin/modules/GoodsReturnNote/components/GoodsReturnNoteLinesFieldArray'
import ModuleLink from '@admin/components/ModuleLink'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { GOODS_RETURN_NOTE_STATUS_CONFIG } from '@admin/modules/GoodsReturnNote/constants'
import { map } from 'lodash'
import { projectAddFormSections, projectModule } from '../Project/projectConfig'
import {
  companyAddFormSections,
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import {
  PublishedAtDisplayField,
  TitleDisplayField,
} from '../Quotation/components'
import { warehouseModule } from '../Warehouse/warehouseConfig'
import { getAssigneeField } from '../../utils/getUserField'

export const goodsReturnNoteFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [getAssigneeField()],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [
      {
        key: 'status',
        name: 'status',
        type: 'input',
        options: map(GOODS_RETURN_NOTE_STATUS_CONFIG, 'value'),
      },
    ],
  },
  {
    key: 'title',
    title: 'Goods Return Note',
    fields: [<TitleDisplayField overline="Goods Return Note" />],
  },
  {
    key: 'published_at',
    title: 'Goods Return Note Date',
    fields: [<PublishedAtDisplayField overline="Goods Return Note Date" />],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [
      {
        key: 'project_id',
        name: 'project_id',
        type: 'model',
        module: projectModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={projectModule}
            addFormSections={projectAddFormSections}
          />
        ),
      },
    ],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [
      {
        key: 'company_id',
        name: 'company_id',
        type: 'model',
        module: companyModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={companyModule}
            addFormSections={companyAddFormSections}
          />
        ),
      },
    ],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [
      {
        key: 'contact_id',
        name: 'contact_id',
        type: 'model',
        module: contactModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={contactModule}
            addFormSections={contactAddFormSections}
          />
        ),
      },
    ],
  },
  {
    key: 'order',
    title: 'Order',
    fields: [
      {
        key: 'invoice_id',
        name: 'invoice_id',
        label: 'Invoice Reference',
        type: 'model',
        module: invoiceModule,
      },
    ],
  },
  {
    key: 'warehouse',
    title: 'Warehouse Location',
    fields: [
      {
        key: 'warehouse_id',
        name: 'warehouse_id',
        label: 'Warehouse Location',
        type: 'model',
        module: warehouseModule,
      },
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [<GoodsReturnNoteLinesFieldArray />],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [
      { key: 'external_notes', name: 'external_notes', type: 'textarea' },
      { key: 'internal_notes', name: 'internal_notes', type: 'textarea' },
    ],
  },
]

export const goodsReturnNoteModule = {
  sk: 'slug',
  table: {
    name: 'goods_return_note',
  },
  name: {
    singular: 'Goods Return Note',
    plural: 'Goods Return Notes',
  },
  route: {
    plural: routes.GOODS_RETURN_NOTES,
  },
  select: {
    list: '*, invoice(id, title, slug), company(id, title, slug), contact(id, title, slug)',
    detail: `
        *, 
        project(*), 
        company(*), 
        contact(*), 
        invoice(*),
        warehouse(*),
        lines:goods_return_note_line(
          *,
          product(
            *, 
            brand(*, currency_factor(title, buy_rate, sell_rate), company:company_id(title, slug)), category(title)
          )
        )`,
  },
  relations: {
    lines: { table: { name: 'goods_return_note_line' } },
  },
  Icon: CalculateOutlinedIcon,
}

export const goodsReturnNotePreviewFormSections = goodsReturnNoteFormSections

export const goodsReturnNoteColumnDefs = [
  { field: 'title' },
  {
    field: 'invoice.title',
    headerName: 'Invoice Ref',
    module: invoiceModule,
    cellRenderer: ({ data }) => (
      <ModuleLink module={invoiceModule} item={data?.invoice} />
    ),
  },
  {
    field: 'company.title',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'status',
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(GOODS_RETURN_NOTE_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
