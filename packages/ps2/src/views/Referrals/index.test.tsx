import React from 'react';
import { screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from 'util/test';
import TiersModal from './components/TiersModal';
import {
  referralRewardsResponseMockSuccess,
  referralTierLevelsResponseMockSuccess,
} from 'test/mocks/referral';

test('renders tier progress', async () => {
  renderWithProviders(
    <TiersModal
      tiers={referralTierLevelsResponseMockSuccess}
      rewards={referralRewardsResponseMockSuccess}
      open={true}
      close={() => {}}
    />,
  );

  const tierBoostCurrent = screen.getByTestId('tiers-current');
  expect(within(tierBoostCurrent).getByText('1.1x boost')).toBeInTheDocument();
  expect(
    within(tierBoostCurrent).getByText('5.5%', { exact: false }),
  ).toBeInTheDocument();

  const tierBoostNext = screen.getByTestId('tiers-next');
  expect(within(tierBoostNext).getByText('1.2x boost')).toBeInTheDocument();
  expect(
    within(tierBoostNext).getByText('6%', { exact: false }),
  ).toBeInTheDocument();

  const tierAmount = screen.getByTestId('tiers-amount');
  expect(
    within(tierAmount).getByText('120,117.17 / 500,000 ZIG', { exact: false }),
  ).toBeInTheDocument();
});

test('shows AUM amount if reached level without ZIG', async () => {
  const rewards = {
    ...referralRewardsResponseMockSuccess,
    tierLevelId: 2,
    tierLevelFactor: 1.1,
    zigBalance: 100,
    usdtAum: 100000,
  };
  renderWithProviders(
    <TiersModal
      tiers={referralTierLevelsResponseMockSuccess}
      rewards={rewards}
      open={true}
      close={() => {}}
    />,
  );

  const tierCurrent = screen.getByTestId('tiers-current');
  expect(within(tierCurrent).getByText('1.1x boost')).toBeInTheDocument();
  expect(
    within(tierCurrent).getByText('5.5%', { exact: false }),
  ).toBeInTheDocument();

  const tierNext = screen.getByTestId('tiers-next');
  expect(
    within(tierNext).getByText('6%', { exact: false }),
  ).toBeInTheDocument();

  const tierAmount = screen.getByTestId('tiers-amount');
  expect(
    within(tierAmount).getByText('$100,000', { exact: false }),
  ).toBeInTheDocument();
});

test('handles max tier reached', async () => {
  const rewards = {
    ...referralRewardsResponseMockSuccess,
    tierLevelId: 6,
    tierLevelFactor: 1.5,
    zigBalance: 10000000,
  };
  renderWithProviders(
    <TiersModal
      tiers={referralTierLevelsResponseMockSuccess}
      rewards={rewards}
      open={true}
      close={() => {}}
    />,
  );

  const tierCurrent = screen.getByTestId('tiers-current');
  expect(within(tierCurrent).getByText('1.5x boost')).toBeInTheDocument();
  expect(
    within(tierCurrent).getByText('7.5%', { exact: false }),
  ).toBeInTheDocument();

  const tierNext = screen.getByTestId('tiers-next');
  expect(within(tierNext).getByText('-')).toBeInTheDocument();

  const tierAmount = screen.getByTestId('tiers-amount');
  expect(
    within(tierAmount).getByText('10,000,000 ZIG', { exact: false }),
  ).toBeInTheDocument();
});

test('renders tiers chart', async () => {
  renderWithProviders(
    <TiersModal
      tiers={referralTierLevelsResponseMockSuccess}
      rewards={referralRewardsResponseMockSuccess}
      open={true}
      close={() => {}}
    />,
  );

  expect(
    within(screen.getByTestId('tier-chart-1')).getByText('1x'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-zig-1')).getByText('0'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-aum-1')).getByText('$0'),
  ).toBeInTheDocument();

  expect(
    within(screen.getByTestId('tier-chart-1.1')).getByText('1.1x'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-zig-1.1')).getByText('100K'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-aum-1.1')).getByText('$100K'),
  ).toBeInTheDocument();

  expect(
    within(screen.getByTestId('tier-chart-1.5')).getByText('1.5x'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-zig-1.5')).getByText('10M'),
  ).toBeInTheDocument();
  expect(
    within(screen.getByTestId('tier-chart-aum-1.5')).getByText('$7.5M'),
  ).toBeInTheDocument();
});
