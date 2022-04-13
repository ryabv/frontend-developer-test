import React, { useEffect } from 'react';
import { mount } from 'enzyme';

import { HookWrapper, waitForComponentToPaint } from '../../../../utils/testHelpers';
import { ORDER_BY } from '../../../../constants/tables';
import { useSortable } from '../hooks';

const TestComponent = ({ initialOrderBy, onSort }) => {
  const { orderBy, handleSort } = useSortable({ initialOrderBy, onSort });

  useEffect(() => {
    handleSort('test');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>{JSON.stringify(orderBy)}</div>
  );
};

describe('useSortable', () => {
  const initialOrderBy = { id: 'test', order: ORDER_BY.ASC };

  it('uses initial orderBy value if it is passed', () => {
    const wrapper = mount(<HookWrapper hook={() => useSortable({ initialOrderBy })} />);
    const { orderBy } = wrapper.find('div').prop('data-hook');

    expect(orderBy).toStrictEqual(initialOrderBy);
  });

  it('changes order on handleSort', async () => {
    const wrapper = mount(<TestComponent initialOrderBy={initialOrderBy} />);

    await waitForComponentToPaint(wrapper);
    const result = wrapper.find('div').text();

    expect(JSON.parse(result)).toStrictEqual({ id: 'test', order: ORDER_BY.DESC });
  });

  it('calls onSort prop on handleSort', async () => {
    const onSortMock = jest.fn();
    const wrapper = mount(<TestComponent onSort={onSortMock} />);

    await waitForComponentToPaint(wrapper);

    expect(onSortMock).toHaveBeenCalled();
  });
});
