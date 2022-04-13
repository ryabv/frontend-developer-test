import React from 'react';
import { mount } from 'enzyme';

import { HookWrapper } from '../../../../utils/testHelpers';
import { ORDER_BY } from '../../../../constants/tables';
import { useHistoryTable } from '../hooks';

describe('useHistoryTable', () => {
  const data = [
    {
      id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
      timestamp: new Date('2020/2/14').getTime(),
      diff: [
        { field: 'name', oldValue: 'John', newValue: 'Bruce' },
      ],
    },
    {
      id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
      timestamp: new Date('2020/2/16').getTime(),
      diff: [
        { field: 'name', oldValue: 'Nick', newValue: 'Michel' },
      ],
    },
    {
      id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
      timestamp: new Date('2020/2/15').getTime(),
      diff: [
        { field: 'name', oldValue: 'Bruce', newValue: 'Nick' },
      ],
    },
  ];

  const dataSet = [
    {
      data,
      orderBy: { id: 'date', order: ORDER_BY.ASC },
      expected: [
        [
          { value: '2020-02-14', noWrap: true, rowSpan: 1 },
          { value: 'e28d290a-a2f2-48c2-9001-ff43884e271b', rowSpan: 1 },
          { value: 'John', noWrap: true },
          { value: 'Bruce', noWrap: true }
        ],
        [
          { value: '2020-02-15', noWrap: true, rowSpan: 1 },
          { value: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92', rowSpan: 1 },
          { value: 'Bruce', noWrap: true },
          { value: 'Nick', noWrap: true }
        ],
        [
          { value: '2020-02-16', noWrap: true, rowSpan: 1 },
          { value: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac', rowSpan: 1 },
          { value: 'Nick', noWrap: true },
          { value: 'Michel', noWrap: true }
        ]
      ],
    },
    {
      data,
      orderBy: { id: 'date', order: ORDER_BY.DESC },
      expected: [
        [
          { value: '2020-02-16', noWrap: true, rowSpan: 1 },
          { value: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac', rowSpan: 1 },
          { value: 'Nick', noWrap: true },
          { value: 'Michel', noWrap: true }
        ],
        [
          { value: '2020-02-15', noWrap: true, rowSpan: 1 },
          { value: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92', rowSpan: 1 },
          { value: 'Bruce', noWrap: true },
          { value: 'Nick', noWrap: true }
        ],
        [
          { value: '2020-02-14', noWrap: true, rowSpan: 1 },
          { value: 'e28d290a-a2f2-48c2-9001-ff43884e271b', rowSpan: 1 },
          { value: 'John', noWrap: true },
          { value: 'Bruce', noWrap: true }
        ]
      ],
    }
  ];

  it.each(dataSet)('returns mapped and sorted data', ({ data, orderBy, expected }) => {
    const wrapper = mount(<HookWrapper hook={() => useHistoryTable({ data, orderBy })} />);
    const { sortedHistory } = wrapper.find('div').prop('data-hook');

    expect(sortedHistory).toStrictEqual(expected);
  });
});
