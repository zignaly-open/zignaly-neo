import React from 'react';
import {
  getByText,
  fireEvent,
  waitFor,
  queryByText,
} from '@testing-library/react';
import { renderWithProviders } from '../../util/test';
import Subscriptions from './index';
import { userStateMock } from '../../test/mocks/user';
import SubscribeForm from './SubscribeForm';

test('renders Subscriptions component', async () => {
  const { container } = renderWithProviders(<Subscriptions />, {
    preloadedState: {
      user: userStateMock,
    },
  });
  await waitFor(() => {
    expect(getByText(container, 'tabs.annually')).toBeInTheDocument();
    expect(getByText(container, 'tabs.lifetime')).toBeInTheDocument();
    expect(getByText(container, 'title')).toBeInTheDocument();
  });
});

test('switches tabs when clicking', async () => {
  const { container } = renderWithProviders(<Subscriptions />, {
    preloadedState: {
      user: userStateMock,
    },
  });
  await waitFor(() => {
    const lifetimeTab = getByText(container, 'tabs.lifetime');
    fireEvent.click(lifetimeTab);
  });
  await waitFor(() => {
    const annuallyTab = getByText(container, 'tabs.annually');
    const lifetimeTab = getByText(container, 'tabs.lifetime');
    expect(lifetimeTab).toHaveClass('Mui-selected');
    expect(annuallyTab).not.toHaveClass('Mui-selected');
    fireEvent.click(annuallyTab);
  });
  await waitFor(() => {
    const annuallyTab = getByText(container, 'tabs.annually');
    const lifetimeTab = getByText(container, 'tabs.lifetime');
    expect(annuallyTab).toHaveClass('Mui-selected');
    expect(lifetimeTab).not.toHaveClass('Mui-selected');
  });
});

test('renders SubscribeForm component', async () => {
  const { container } = renderWithProviders(<SubscribeForm />);
  const input = container.querySelector('#subscribe-form__input-code');
  expect(input).toBeInTheDocument();
  expect(getByText(container, 'redeem-code')).toBeInTheDocument();
});
test('subscribe form validation', async () => {
  const { container } = renderWithProviders(<SubscribeForm />);
  const codeInput = container.querySelector('#subscribe-form__input-code');

  // Fill in the wrong code input
  fireEvent.change(codeInput, { target: { value: 'example-code' } });

  // Fill in the right code input
  await waitFor(() => {
    expect(
      getByText(container, 'validation.invalid-code-format'),
    ).toBeInTheDocument();
  });
  fireEvent.change(codeInput, { target: { value: 'aa-aaaa-aaaa-aaaa' } });

  await waitFor(() => {
    expect(
      queryByText(container, 'validation.invalid-code-format'),
    ).not.toBeInTheDocument();
  });
});
