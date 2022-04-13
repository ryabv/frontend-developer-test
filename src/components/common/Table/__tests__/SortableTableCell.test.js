import React from 'react';
import { shallow } from 'enzyme';

import { TableSortLabel } from '@material-ui/core';

import { ORDER_BY } from '../../../../constants/tables';
import SortableTableCell from '../SortableTableCell';

describe('<SortableTableCell />', function () {
  const setUp = (props) => shallow(<SortableTableCell {...props} />);

  const dataSet = [
    {
      props: { id: 'test', orderBy: { id: 'test', order: ORDER_BY.DESC } },
      expectedActive: true,
      expectedDir: ORDER_BY.DESC,
    },
    {
      props: { id: 'test', orderBy: { id: 'anotherId', order: ORDER_BY.DESC } },
      expectedActive: false,
      expectedDir: ORDER_BY.ASC,
    },
  ];

  it.each(dataSet)('renders correctly', async ({ props, expectedActive, expectedDir }) => {
    const wrapper = setUp(props);

    const sortLabel = wrapper.find(TableSortLabel);
    expect(sortLabel.prop('active')).toBe(expectedActive);
    expect(sortLabel.prop('direction')).toBe(expectedDir);
  });
});
