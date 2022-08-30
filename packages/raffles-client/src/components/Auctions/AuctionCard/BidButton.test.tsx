import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import BidButton from './BidButton';

const auction = {
  id: 4,
  title: 'Auction #777',
  description: 'Blah blah blah blhahblah bla blah hh!',
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 3600_000),
  monetaryValue: '$84.52',
  imageUrl: '/images/11.jpg',
  basketItems: [
    {
      ticker: 'ETH',
      amount: '500',
    },
  ],
  bids: [
    {
      id: 752,
      position: 1,
      value: '1.47',
      user: {
        id: 13,
        username: 'cemsun',
      },
    },
  ],
  numberOfWinners: 7,
  startingBid: '0.01',
  maxExpiryDate: new Date(Date.now() + 3600_000),
  maxClaimDate: new Date(Date.now() + 3600_000),
};

// jest.mock('util/showToast');

// const mockProvider = new MockProvider();
// const [deployer, spender] = mockProvider.getWallets();

test('returns insufficient funds', async () => {
  const mocks: MockedResponse[] = [];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BidButton auction={auction} isActive={true} />
    </MockedProvider>,
  );
  // expect(screen.getByRole('button')).toHaveTextContent('bid-now');

  // const mockedToast = jest.mocked(showToast);
  // const spy = jest.spyOn('');

  fireEvent.click(screen.getByText('bid-now'));

  // expect(screen.getByRole('button')).toHaveTextContent('Not Enough Funds');
  expect(await screen.findByText('Not Enough Funds')).toBeInTheDocument();

  // await waitFor(() => screen.getByRole('heading'));

  // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  // expect(screen.getByRole('button')).toBeDisabled();
});
