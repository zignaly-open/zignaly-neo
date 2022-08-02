import { useQuery, useSubscription } from '@apollo/client';
import { BALANCE_SUBSCRIPTION, GET_CURRENT_USER_BALANCE } from 'queries/users';
import { getToken } from '../util/token';

export default function useBalance(): {
  loading: boolean;
  balance: number | null;
} {
  const { loading, data } = useQuery(GET_CURRENT_USER_BALANCE);
  return {
    loading,
    balance: data?.balance || '0',
  };
}

export function useBalanceSubscription(): void {
  if (!getToken()) {
    // TODO: error reporting
    // eslint-disable-next-line no-console
    console.error('Trying to subscribe without token, bad!');
  }
  useSubscription(BALANCE_SUBSCRIPTION, {
    variables: {
      token: getToken(),
    },
  });
}
