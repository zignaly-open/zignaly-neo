import React from 'react';
import { screen } from '@testing-library/react';
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

test('loads and displays greeting', async () => {
  // ARRANGE
  renderWithProviders(<LoginForm />);
  await userEvent.type(screen.getByTestId('login__username'), 'hello there');
  expect(screen.getByTestId('login__username')).toHaveValue('hello there');
  await userEvent.type(screen.getByTestId('login__password'), 'hello there');
  expect(screen.getByTestId('login__password')).toHaveValue('hello there');
});
