import React from 'react';
import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '../../../../../../test/server';
import userEvent from '@testing-library/user-event';
import WithdrawForm from '.';
import { renderWithProviders } from '../../../../../../util/test';
import {
  useActiveExchange,
  useCheck2FA,
} from '../../../../../../apis/user/use';

jest.mock('../../../../../../apis/user/use', () => ({
  useActiveExchange: jest.fn(),
  useCheck2FA: jest.fn(),
}));

describe('WithdrawForm', () => {
  beforeEach(() => {
    (useActiveExchange as jest.Mock).mockReturnValue({
      internalId: 'Zignaly1602776531_5f886dd39a4c3',
    });
    (useCheck2FA as jest.Mock).mockReturnValue(() => {});
  });

  const mockProps = {
    step: '',
    setStep: jest.fn(),
    close: jest.fn(),
  };

  it('should display error for wrong address', async () => {
    renderWithProviders(<WithdrawForm {...mockProps} />);

    await waitForElementToBeRemoved(() => screen.getByTestId('oval-loading'));

    fireEvent.mouseDown(screen.getByText('networkSelector.placeholder'));
    fireEvent.click(screen.getByText(/polygon/i));
    await userEvent.type(
      screen.getByText('withdrawAddress.placeholder'),
      'aaaa',
    );

    await waitFor(() => {
      expect(screen.queryByText('Invalid address')).toBeInTheDocument();
    });
  });
});
