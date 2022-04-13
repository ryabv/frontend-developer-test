import React from 'react';
import { shallow } from 'enzyme';

import { Button, CircularProgress } from '@material-ui/core';

import * as useQuery from '../../../../hooks/useQuery';
import * as hooks from '../hooks';
import { ERROR_MESSAGE } from '../config';
import HistoryTable from '../HistoryTable';

describe('<HistoryTable />', () => {
  jest.mock('../../../../hooks/useQuery', () => jest.fn());
  const spyUseQuery = jest.spyOn(useQuery, 'default');

  jest.mock('../hooks', () => ({ useHistoryTable: jest.fn() }));
  const spyUseHistoryTable = jest.spyOn(hooks, 'useHistoryTable');

  const setUp = (props) => shallow(<HistoryTable {...props} />);

  it('shows fetch error if error is passed', () => {
    spyUseQuery.mockReturnValue({
      pending: false,
      error: 'Test error',
    });

    const historyTable = setUp();
    expect(historyTable.text()).toContain(ERROR_MESSAGE);
  });

  it('shows pending state if pending is true', () => {
    spyUseQuery.mockReturnValue({
      pending: true,
    });

    const historyTable = setUp();
    expect(historyTable.find(CircularProgress)).toHaveLength(1);
    expect(historyTable.text()).not.toContain(ERROR_MESSAGE);
    expect(historyTable.find(Button)).toHaveLength(0);
  });

  it('shows button if can fetch more', () => {
    spyUseQuery.mockReturnValue({
      pending: false,
      response: {
        total: 10,
      },
    });

    spyUseHistoryTable.mockReturnValue({
      sortedHistory: [{ id: 'test' }]
    });

    const historyTable = setUp();
    expect(historyTable.find(Button)).toHaveLength(1);
  });

  it('does not show button if cannot fetch more', () => {
    spyUseQuery.mockReturnValue({
      pending: false,
      response: {
        total: 1,
      },
    });

    spyUseHistoryTable.mockReturnValue({
      sortedHistory: [{ id: 'test' }]
    });

    const historyTable = setUp();
    expect(historyTable.find(Button)).toHaveLength(0);
  });

  it('shows title', () => {
    const title = 'Test title';
    const historyTable = setUp({ title });

    expect(historyTable.text()).toContain(title);
  });
});
