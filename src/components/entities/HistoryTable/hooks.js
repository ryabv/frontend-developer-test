import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '../../../constants/datetime';
import { dateComparator } from './config';

export const useHistoryTable = ({ data, orderBy }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (data) {
      const adaptedDataToTable = data.flatMap(({ id, timestamp, diff }) => {
        const date = dayjs(timestamp).format(DATE_FORMAT);

        const mainRow = [
          { value: date, noWrap: true, rowSpan: diff.length },
          { value: id, rowSpan: diff.length },
          { value: diff[0].oldValue, noWrap: true },
          { value: diff[0].newValue, noWrap: true },
        ];

        const subRows = diff.reduce((acc, { oldValue, newValue }, i) => {
          if (i > 0) {
            acc.push([
              { value: date, noWrap: true, hidden: true },
              { value: id, hidden: true },
              { value: oldValue, noWrap: true },
              { value: newValue, noWrap: true },
            ]);
          }

          return acc;
        }, []);

        return [mainRow, ...subRows];
      })

      setHistory((prev) => [...prev, ...adaptedDataToTable]);
    }
  }, [data]);

  const sortedHistory = useMemo(() => {
    if (orderBy.id === 'date') {
      return [...history].sort((a, b) => dateComparator(orderBy.order)(a[0].value, b[0].value));
    }

    return history;
  }, [history, orderBy]);

  return { sortedHistory };
};
