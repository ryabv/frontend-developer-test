import React, { useCallback } from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';

const SortableTableCell = ({ id, children, orderBy, handleSort }) => {
  const handleClick = useCallback(() => handleSort(id), [handleSort, id]);

  return (
    <TableCell>
        <TableSortLabel
          active={orderBy.id === id}
          direction={orderBy.id === id ? orderBy.order : 'asc'}
          onClick={handleClick}
        >
          {children}
        </TableSortLabel>
    </TableCell>
  );
};

export default SortableTableCell;
