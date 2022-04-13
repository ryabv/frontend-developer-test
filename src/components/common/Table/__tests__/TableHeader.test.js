import React from 'react';
import { shallow } from 'enzyme';

import { TableRow, TableCell } from '@material-ui/core';

import { ORDER_BY } from '../../../../constants/tables';
import TableHeader from '../TableHeader';

describe('<TableHeader />', () => {
  const setUp = (props) => shallow(<TableHeader {...props} />);

  it('renders simple table header correctly', () => {
    const headers = [
      { id: 'type', title: 'Type' },
      { id: 'item', title: 'Item' },
    ];

    const tableHeader = setUp({ headers });
    expect(tableHeader.find(TableRow).at(0).find(TableCell)).toHaveLength(2);
  });

  it('renders sortable table header correctly', () => {
    const orderBy = { id: 'type', order: ORDER_BY.DESC };
    const headers = [
      { id: 'type', title: 'Type', sortable: true },
      { id: 'item', title: 'Item' },
    ];

    const tableHeader = setUp({ headers, orderBy, handleSort: () => null });
    expect(tableHeader.find(TableRow).at(0).findWhere((el) => el.prop('orderBy'))).toHaveLength(1);
  });
});
