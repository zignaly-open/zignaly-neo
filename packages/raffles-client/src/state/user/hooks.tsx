import { UserType } from '@zignaly-open/raffles-shared/types';
import { ConnectionType } from 'config/web3';
import { useAppSelector } from 'state/hooks';

export function useGetCurrentUser(): UserType | undefined {
  return useAppSelector((state) => state.user.currentUser);
}

export function useSelectedWallet(): ConnectionType | undefined {
  return useAppSelector((state) => state.user.selectedWallet);
}
