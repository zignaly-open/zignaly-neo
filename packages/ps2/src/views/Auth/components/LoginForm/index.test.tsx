import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from '.';
import { renderWithProviders } from '../../../../util/test';

// jest.mock('../../../../apis/user/use', () => ({
//   // this mock makes sure any components using the translate hook can use it without a warning being shown
//   useAuthenticate: () => {
//     return [{ loading: false }, (data) => Promise.resolve(true)];
//   },
// }));

test('basic email validation should work', async () => {
  renderWithProviders(<LoginForm />);
  const email = 'alex@xfuturum.com';
  fireEvent.blur(screen.getByTestId('login__username'));
  await waitFor(() => {
    expect(screen.getAllByText('error:error.required').length).toBe(1);
  });
  await userEvent.type(screen.getByTestId('login__username'), email);
  await waitFor(() => {
    expect(screen.queryByText('error')).not.toBeInTheDocument();
  });
  await userEvent.type(screen.getByTestId('login__username'), email + '_');
  await waitFor(() => {
    expect(screen.getAllByText('error:error.email-invalid').length).toBe(1);
  });
});

test('different validation behavior on revalidate', async () => {
  renderWithProviders(<LoginForm />);

  await userEvent.click(screen.getByTestId('login__submit'));
  await waitFor(() => {
    expect(screen.getAllByText('error:error.required').length).toBe(2);
  });

  const email = 'alex@xfuturum.com';
  await userEvent.type(screen.getByTestId('login__username'), email);
  // we should have 2 here because we have revalidation onBlur
  // the next test case verifies this
  await waitFor(() => {
    expect(screen.getAllByText('error:error.required').length).toBe(2);
  });
});
