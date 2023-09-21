import { useMarketplaceQuery } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActiveRowMobile } from './store';

export const useMarketplace = useMarketplaceQuery;

export function useChangeActiveRowMobile(): {
  activeRow: string;
  setActiveRow: (v: string) => void;
} {
  const { activeRowMobile } = useSelector(
    (state: RootState) => state.marketplace,
  );
  const dispatch = useDispatch();
  return {
    activeRow: activeRowMobile,
    setActiveRow: (v: string) => dispatch(setActiveRowMobile(v)),
  };
}
