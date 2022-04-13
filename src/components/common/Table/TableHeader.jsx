import React from 'react';

import { TableCell, TableHead, TableRow } from '@material-ui/core';

import SortableTableCell from './SortableTableCell';

export const TableHeader = ({ headers, handleSort, orderBy }) => (
  <TableHead>
    <TableRow>
      {headers.map(({ id, title, sortable }) => {
        if (sortable) {
          return (
            <SortableTableCell
              key={id}
              id={id}
              handleSort={handleSort}
              orderBy={orderBy}
            >
              {title}
            </SortableTableCell>
          );
        }

        return (
          <TableCell key={id}>
            {title}
          </TableCell>
        );
      })}
    </TableRow>
  </TableHead>
);

export default TableHeader;
