import React from 'react';
import {
  screen,
  // fireEvent,
  waitFor,
  // act,
  // cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from '.';
import { renderWithProviders } from '../../../../util/test';
import {
  loginMockEmail as email,
  loginMockPassword as password,
} from '../../../../test/mocks/login';
//
// test('basic email validation should work', async () => {
//   renderWithProviders(<LoginForm />);
//   fireEvent.blur(screen.getByTestId('login__username'));
//   await waitFor(() => {
//     expect(screen.getAllByText('error.required').length).toBe(1);
//   });
//   await userEvent.type(screen.getByTestId('login__username'), email);
//   await waitFor(() => {
//     expect(screen.queryByText('error')).not.toBeInTheDocument();
//   });
//   await userEvent.type(screen.getByTestId('login__username'), email + '_');
//   await waitFor(() => {
//     expect(screen.getAllByText('error.email-invalid').length).toBe(1);
//   });
// });
//
// test('different validation behavior on revalidate', async () => {
//   renderWithProviders(<LoginForm />);
//
//   await userEvent.click(screen.getByTestId('login__submit'));
//   await waitFor(() => {
//     expect(screen.getAllByText('error.required').length).toBe(2);
//   });
//
//   await userEvent.type(screen.getByTestId('login__username'), email);
//   // we should have 2 here because we have revalidation onBlur
//   // the next test case verifies this
//   await waitFor(() => {
//     expect(screen.getAllByText('error.required').length).toBe(2);
//   });
// });

test('successful log in', async () => {
  renderWithProviders(<LoginForm />);
  await userEvent.type(screen.getByTestId('login__username'), email);
  await userEvent.type(screen.getByTestId('login__password'), password);
  await userEvent.click(screen.getByTestId('login__submit'));
  await waitFor(() => {
    expect(screen.getByTestId('auth-verify-modal__title')).toBeInTheDocument();
  });
});
//
// test('unsuccessful log in', async () => {
//   renderWithProviders(<LoginForm />);
//   await userEvent.type(screen.getByTestId('login__username'), email);
//   await userEvent.type(screen.getByTestId('login__password'), `${password}1`);
//   await userEvent.click(screen.getByTestId('login__submit'));
//   await waitFor(() => {
//     expect(screen.getByText('Wrong credentials')).toBeInTheDocument();
//   });
// });
