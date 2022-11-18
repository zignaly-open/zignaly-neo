import { useQuery, useSubscription } from '@apollo/client';
import {
  BALANCE_SUBSCRIPTION,
  GET_CURRENT_USER_BALANCE,
} from 'config/apollo/queries';
import { getToken } from '../util/token';

export default function useBalance(): {
  loading: boolean;
  balance: number | null;
} {
  const { loading, data } = useQuery(GET_CURRENT_USER_BALANCE, {
    skip: !getToken(),
  });

  return {
    loading,
    balance: data?.balance?.balance || '0',
  };
}

export function useBalanceSubscription(): void {
  useSubscription(BALANCE_SUBSCRIPTION, {
    variables: {
      token: getToken(),
    },
    skip: !getToken(),
  });
}
