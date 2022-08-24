// Dependencies
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useSelectCoins(): object[] {
  const coins = useSelector((state: RootState) => state.coins);
  return coins;
}
