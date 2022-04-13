import React from 'react';
import { shallow } from 'enzyme';

import { TableRow, TableCell } from '@material-ui/core';

import Table from '../Table';
import { NO_DATA_MESSAGE } from '../config';

describe('<Table />', () => {
  const setUp = (props) => shallow(<Table {...props} />);
  const headers = [
    { id: 'type', title: 'Type' },
    { id: 'item', title: 'Item' },
  ];

  it('renders no data message correctly', () => {
    const table = setUp({ headers });
    expect(table.text()).toContain(NO_DATA_MESSAGE);
  });

  it('does not render no data message if loading props passed', () => {
    const table = setUp({ headers, loading: true });
    expect(table.text()).not.toContain(NO_DATA_MESSAGE);
  });

  it('renders simple table correctly', () => {
    const rows = [
      [
        { value: 'Fruit' },
        { value: 'Orange' },
      ],
      [
        { value: 'Vegetable', },
        { value: 'Tomato' },
      ],
    ];

    const table = setUp({ headers, rows });
    expect(table.dive().find(TableRow)).toHaveLength(2);
  });

  it('renders complicated table correctly', () => {
    const rows = [
      [
        { value: 'Fruit', rowSpan: 2 },
        { value: 'Orange' },
      ],
      [
        { value: 'Fruit', hidden: true },
        { value: 'Banana' },
      ],
      [
        { value: 'Vegetable', },
        { value: 'Tomato' },
      ],
    ];

    const table = setUp({ headers, rows });
    expect(table.dive().find(TableRow)).toHaveLength(3);
    expect(table.dive().find(TableRow).at(0).find(TableCell)).toHaveLength(2);
    expect(table.dive().find(TableRow).at(1).find(TableCell)).toHaveLength(1);
    expect(table.dive().find(TableRow).at(2).find(TableCell)).toHaveLength(2);
  });
});
