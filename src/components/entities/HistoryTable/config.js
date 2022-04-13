import dayjs from 'dayjs';

import { ORDER_BY } from '../../../constants/tables';

export const headers = [
  { id: 'date', title: 'Date', sortable: true },
  { id: 'uid', title: 'User ID' },
  { id: 'oldValue', title: 'Old value' },
  { id: 'newValue', title: 'New value' },
];

export const initialOrderBy = {
  id: 'date',
  order: ORDER_BY.DESC,
};

export const ERROR_MESSAGE = 'We had problems fetching your data. Please try again.';
export const RETRY = 'Retry';
export const FETCH_MORE = 'Fetch more';

export const dateComparator = (order) => (a, b) => {
  const timestamp = (dateString) => dayjs(dateString).valueOf();

  if (order === ORDER_BY.ASC) {
    return timestamp(a) - timestamp(b);
  }

  if (order === ORDER_BY.DESC) {
    return timestamp(b) - timestamp(a);
  }

  return 0;
};
