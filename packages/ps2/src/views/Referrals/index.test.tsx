import React from 'react';
import { screen, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ReferralsPage from '.';
import { renderWithProviders } from 'util/test';
import {
  loginMockEmail as email,
  loginMockPassword as password,
} from '../../../../test/mocks/login';
import user from 'test/mocks/user';

test('displays max commission', async () => {
  const result = renderWithProviders(<ReferralsPage />, {
    preloadedState: {
      user,
    },
  });
  const someElement = result.container.querySelector(
    '#referrals-invite-modal__max-commission',
  );
  console.log(prettyDOM(result.container));
  await waitFor(() => {
    expect(someElement).toBeInTheDocument();
  });
});
