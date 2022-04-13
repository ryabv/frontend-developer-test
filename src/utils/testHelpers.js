import { act } from 'react-dom/test-utils';
import React from 'react';

export const HookWrapper = ({ hook }) => (<div data-hook={hook()} />);

export const waitForComponentToPaint = async (wrapper, timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    wrapper.update();
  });
};
