import { gql, useQuery, useSubscription } from '@apollo/client';
import { getToken } from '../util/token';

export const GET_CURRENT_USER_BALANCE = gql`
  query balanced {
    balance {
      id
      balance
    }
  }
`;

export const BALANCE_SUBSCRIPTION = gql`
  subscription onBalanceChanged($token: String!) {
    balanceChanged(token: $token) {
      id
      balance
    }
  }
`;

export default function useBalance(): {
  loading: boolean;
  balance: number | null;
} {
  const { loading, data } = useQuery(GET_CURRENT_USER_BALANCE);
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

  return {
    loading,
    balance: data?.balance?.balance,
  };
}
