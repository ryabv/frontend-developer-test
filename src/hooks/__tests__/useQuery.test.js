import React from 'react';
import { mount } from 'enzyme';

import { HookWrapper, waitForComponentToPaint } from '../../utils/testHelpers';
import useQuery from '../useQuery';

describe('useQuery', () => {
  const pendingOutput = {
    pending: true,
    data: undefined,
    error: undefined,
    response: {},
    refetch: expect.any(Function),
  };

  const setUpResultOutput = (payload) => ({
    pending: false,
    data: payload.data,
    error: payload.error,
    response: payload,
    refetch: expect.any(Function),
  });

  const dataSet = [
    [{ data: [], error: '' }, 'resolve'],
    [{ data: [], error: 'Test error' }, 'reject'],
  ];

  it.each(dataSet)('fetches %s and %s', async (payload, promiseMethod) => {
    const apiHandler = () => Promise[promiseMethod](payload);
    const resultOutput = setUpResultOutput(payload);

    const wrapper = mount(<HookWrapper hook={() => useQuery(apiHandler)} />);

    const result = wrapper.find('div').prop('data-hook');
    expect(result).toStrictEqual(pendingOutput);

    await waitForComponentToPaint(wrapper);
    const result2 = wrapper.find('div').prop('data-hook');
    expect(result2).toStrictEqual(resultOutput);
  });
});
