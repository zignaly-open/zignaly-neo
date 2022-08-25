import useContract from './useContract';
import { renderHook } from '@testing-library/react-hooks';
import { renderDAppHook } from 'util/renderDAppHooks';

jest.mock('../contract', () => jest.fn());
jest.mock('@usedapp/core/src/hooks/useContractFunction', () => ({}));

describe('useContract', () => {
  describe('transfer', () => {
    it('returns promise', () => {
      const { result } = renderHook(() => useContract({ address: 'abc' }));
      expect(result.current.transfer('10')).toEqual(new Promise(jest.fn()));
    });

    it('return successfully with on status.success', async () => {
      const { result } = await renderDAppHook(() =>
        useContract({ address: 'abc' }),
      );
      await result.current.transfer('10');
      expect(result.current.isLoading).toEqual(true);
    });
  });
});
