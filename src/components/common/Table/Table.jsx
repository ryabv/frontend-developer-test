import React from 'react';

import {
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core';

import TableHeader from './TableHeader';
import { NO_DATA_MESSAGE } from './config';

const Table = ({ headers, rows, loading, orderBy, handleSort }) => {
  return (
    <MuiTable>
      <TableHeader
        headers={headers}
        orderBy={orderBy}
        handleSort={handleSort}
      />

      <TableBody>
        {!rows.length && !loading && (
          <TableRow>
            <TableCell colSpan={headers.length}>
              {NO_DATA_MESSAGE}
            </TableCell>
          </TableRow>
        )}

        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {row.map(({ value, noWrap, rowSpan, colSpan, hidden }) => (
              !hidden && (
                <TableCell rowSpan={rowSpan} colSpan={colSpan} key={value}>
                  <Typography noWrap={noWrap}>
                    {value}
                  </Typography>
                </TableCell>
              )
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
}

Table.defaultProps = {
  rows: [],
  orderBy: {},
  handleSort: () => null,
};

export default Table;
