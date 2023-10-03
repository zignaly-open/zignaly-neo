import { fireEvent, getByText, waitFor } from '@testing-library/react';
import React from 'react';
import { default as KycComponent } from './index';
import { renderWithProviders } from '../../../util/test';
import { userStateMock } from '../../../test/mocks/user';

test('renders the Kyc component', async () => {
  const { container } = renderWithProviders(<KycComponent />, {
    preloadedState: {
      user: userStateMock,
    },
  });
  await waitFor(() => {
    expect(getByText(container, 'title')).toBeInTheDocument();
    expect(getByText(container, 'tabs.kyc')).toBeInTheDocument();
    expect(getByText(container, 'tabs.kyb')).toBeInTheDocument();
  });
});

test('switches between KYC and KYB tabs', async () => {
  const { container } = renderWithProviders(<KycComponent />, {
    preloadedState: {
      user: userStateMock,
    },
  });
  await waitFor(() => {
    const kybTab = getByText(container, 'tabs.kyb');
    fireEvent.click(kybTab);
  });
  await waitFor(() => {
    const kycTab = getByText(container, 'tabs.kyc');
    const kybTab = getByText(container, 'tabs.kyb');
    expect(kybTab).toHaveClass('Mui-selected');
    expect(kycTab).not.toHaveClass('Mui-selected');
    fireEvent.click(kycTab);
  });
  await waitFor(() => {
    const kycTab = getByText(container, 'tabs.kyc');
    const kybTab = getByText(container, 'tabs.kyb');
    expect(kycTab).toHaveClass('Mui-selected');
    expect(kybTab).not.toHaveClass('Mui-selected');
  });
});
