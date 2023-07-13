import { renderHook } from '@testing-library/react';
import { useTierLayers } from './util';

const tiers = [
  {
    id: 1,
    name: 'Tier 0',
    invitees: 1,
    commissionPct: 10,
  },
  {
    id: 2,
    name: 'Tier 1',
    invitees: 2,
    commissionPct: 20,
  },
  {
    id: 3,
    name: 'Tier 2',
    invitees: 3,
    commissionPct: 30,
  },
  {
    id: 4,
    name: 'Tier 3',
    invitees: 4,
    commissionPct: 40,
  },
  {
    id: 5,
    name: 'Tier 4',
    invitees: 5,
    commissionPct: 50,
  },
];

describe('useTierLayers', () => {
  it('should calculate the 3 layers when user + trader boost', () => {
    const {
      result: { current: layers },
    } = renderHook(() => useTierLayers(tiers, 1, 2, 5));

    expect(layers).toEqual([
      { value: 40, height: 114 },
      {
        value: 20,
        height: 64,
      },
      {
        value: 10,
        height: 32,
      },
    ]);
  });

  it('should calculate the 2 layers when user boost only', () => {
    const {
      result: { current: layers },
    } = renderHook(() => useTierLayers(tiers, 1, 2, 0));

    expect(layers).toEqual([
      { value: 20, height: expect.any(Number) },
      {
        value: 10,
        height: expect.any(Number),
      },
      {
        value: 0,
        height: 0,
      },
    ]);
  });

  it('should calculate the 2 layers when trader boost only', () => {
    const {
      result: { current: layers },
    } = renderHook(() => useTierLayers(tiers, 1, 1, 5));

    expect(layers).toEqual([
      { value: 20, height: expect.any(Number) },
      {
        value: 10,
        height: expect.any(Number),
      },
      {
        value: 0,
        height: 0,
      },
    ]);
  });

  it('should calculate the only layer when no boosts', () => {
    const {
      result: { current: layers },
    } = renderHook(() => useTierLayers(tiers, 1, 1, 0));

    expect(layers).toEqual([
      { value: 10, height: expect.any(Number) },
      {
        value: 0,
        height: 0,
      },
      {
        value: 0,
        height: 0,
      },
    ]);
  });
});
