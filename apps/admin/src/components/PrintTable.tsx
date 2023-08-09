import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { get, startCase } from 'lodash'

const PrintTable = (props) => {
  const { columnDefs, rows } = props

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnDefs.map((columnDef) => {
              const { headerName, field } = (columnDef as any) || {}
              const headerLabel = headerName || startCase(field)
              return (
                <TableCell
                  key={field}
                  sx={{ '& > div': { pageBreakInside: 'avoid' } }}
                >
                  {headerLabel}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columnDefs.map((columnDef) => {
                const { field, valueGetter, valueParser, valueFormatter } =
                  (columnDef as any) || {}
                const value = valueGetter?.({ data: row }) ?? get(row, field)
                const parsedValue = valueParser?.({ newValue: value }) ?? value
                const formattedValue =
                  valueFormatter?.({ value: parsedValue }) ?? parsedValue
                const key = `${row.id}-${field}`

                return <TableCell key={key}>{formattedValue}</TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PrintTable
