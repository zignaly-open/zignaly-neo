import { useMarketplaceQuery } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMobileActiveRow } from './store';

export const useMarketplace = useMarketplaceQuery;

export function useMarketplaceMobileActiveRow(): [string, (v: string) => void] {
  const { mobileActiveRow } = useSelector(
    (state: RootState) => state.marketplace,
  );
  const dispatch = useDispatch();
  return [mobileActiveRow, (v: string) => dispatch(setMobileActiveRow(v))];
}
