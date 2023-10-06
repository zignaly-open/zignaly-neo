import React from 'react';
import { waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReferralsPage from '.';
import { renderWithProviders } from 'util/test';
import { userStateMock } from 'test/mocks/user';

test('displays max commission', async () => {
  const { container } = renderWithProviders(<ReferralsPage />, {
    preloadedState: {
      user: userStateMock,
    },
  });

  await waitFor(() => {
    const el = container.querySelector(
      '#referrals-invite-modal__max-commission',
    );
    expect(getByText(container, 'max-commission')).toBeInTheDocument();
    expect(getByText(el as HTMLElement, '300')).toBeInTheDocument();
    expect(getByText(el as HTMLElement, '3x')).toBeInTheDocument();
  });
});
