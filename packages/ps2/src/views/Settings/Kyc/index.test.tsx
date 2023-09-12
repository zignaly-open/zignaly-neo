import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { default as KycComponent } from './index';
import { renderWithProviders } from '../../../util/test';
import { mockKycStatuses } from '../../../test/mocks/kyc';

// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: (key: string) => key, // Mock translation function
//   }),
// }));

// Mock the currentUser and related functions
const mockCurrentUser = {
  KYCMonitoring: true,
};

const mockLoadUser = jest.fn();

jest.mock('../../../apis/user/api', () => ({
  useCurrentUser: () => mockCurrentUser,
  useLazyUserQuery: () => [mockLoadUser],
  useKycStatusesQuery: () => ({
    data: mockKycStatuses,
  }),
}));

test('renders the Kyc component', () => {
  const { getByText } = renderWithProviders(<KycComponent />);
  const titleElement = getByText('title');
  const descriptionElement = getByText('description');
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('switches between KYC and KYB tabs', async () => {
  const { getByText } = renderWithProviders(<KycComponent />);

  // Initially, the KYC tab should be active
  const kycTab = getByText('KYC');
  const kybTab = getByText('KYB');
  expect(kycTab).toHaveClass('Mui-selected');
  expect(kybTab).not.toHaveClass('Mui-selected');

  // Click on the KYB tab
  fireEvent.click(kybTab);

  await waitFor(() => {
    // Now, the KYB tab should be active
    expect(kycTab).not.toHaveClass('Mui-selected');
    expect(kybTab).toHaveClass('Mui-selected');
  });
});
