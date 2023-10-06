import React from 'react';
import {
  waitFor,
  getByText,
  fireEvent,
  act,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareCommissionSlider from '.';
import { renderWithProviders } from 'util/test';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('displays correct values', async () => {
  const { container } = renderWithProviders(
    <ShareCommissionSlider discountPct={10} max={300} />,
  );

  const elStart = container.querySelector(
    '#referrals-invite-modal__label-start-value',
  ) as HTMLElement;

  const elEnd = container.querySelector(
    '#referrals-invite-modal__label-end-value',
  ) as HTMLElement;
  expect(getByText(elStart, '270')).toBeInTheDocument();
  expect(getByText(elEnd, '30')).toBeInTheDocument();
});

test('updates value', async () => {
  const { container } = renderWithProviders(
    <ShareCommissionSlider discountPct={10} max={300} />,
  );

  const slider = container.querySelector('input[type="range"]');

  act(() => {
    jest.runAllTimers();
    fireEvent.change(slider, { target: { value: 50 } });
  });

  await waitFor(() => {
    expect(slider).toHaveDisplayValue('50');
    expect(screen.getByText('changes-saved')).toBeInTheDocument();
  });
});
