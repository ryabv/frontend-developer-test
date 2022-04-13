import { useState } from 'react';

import { ORDER_BY } from '../../../constants/tables';

export const useSortable = ({
  onSort = () => null,
  initialOrderBy = {},
}) => {
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  const handleSort = (id) => {
    setOrderBy((oldOrderBy) => {
      let newOrderBy = { id, order: ORDER_BY.DESC };

      if (oldOrderBy.id === id) {
        newOrderBy = { id, order: oldOrderBy.order === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC };
      }

      onSort(newOrderBy);

      return newOrderBy;
    });
  };

  return { orderBy, handleSort };
};
