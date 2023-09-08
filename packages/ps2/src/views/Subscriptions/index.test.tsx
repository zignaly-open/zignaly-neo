import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../util/test';
import Subscriptions from './index';
import SubscribeForm from './SubscribeForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock translation function
  }),
}));

test('renders Subscriptions component', () => {
  renderWithProviders(<Subscriptions />);
  expect(screen.getByText('title')).toBeInTheDocument();
  expect(screen.getByText('tabs.annually')).toBeInTheDocument();
  expect(screen.getByText('tabs.lifetime')).toBeInTheDocument();
});

test('switches tabs when clicking', async () => {
  renderWithProviders(<Subscriptions />);
  const annuallyTab = screen.getByText('tabs.annually');
  const lifetimeTab = screen.getByText('tabs.lifetime');

  fireEvent.click(lifetimeTab);
  await waitFor(() => {
    // Now, the KYB tab should be active
    expect(lifetimeTab).toHaveClass('active');
    expect(annuallyTab).not.toHaveClass('active');
  });

  fireEvent.click(annuallyTab);

  await waitFor(() => {
    // Now, the KYB tab should be active
    expect(annuallyTab).toHaveClass('active');
    expect(lifetimeTab).not.toHaveClass('active');
  });
});

jest.mock('@hookform/resolvers/yup', () => ({
  yupResolver: jest.fn(() => ({})),
}));
jest.mock('../../apis/subscription/api', () => ({
  useSubscribeMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
}));
jest.mock('../../util/hooks/useToast', () => ({
  useToast: jest.fn(() => ({ success: jest.fn() })),
}));
jest.mock('../../apis/user/api', () => ({
  useLazyUserQuery: jest.fn(() => [jest.fn(), { data: {} }]),
}));

test('renders SubscribeForm component', () => {
  renderWithProviders(<SubscribeForm />);
  expect(screen.getByText('Redeem Code')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('handles form submission', async () => {
  renderWithProviders(<SubscribeForm />);
  const codeInput = screen.getByRole('textbox', { name: 'code' });
  const submitButton = screen.getByRole('button', { name: 'submit' });

  // Fill in the code input
  fireEvent.change(codeInput, { target: { value: 'example-code' } });

  // Submit the form
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.queryByText('error')).toBeInTheDocument();
  });
  fireEvent.change(codeInput, { target: { value: 'aa-aaaa-aaaa-aaaa' } });

  // Submit the form
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByText('error')).not.toBeInTheDocument();
  });
});
