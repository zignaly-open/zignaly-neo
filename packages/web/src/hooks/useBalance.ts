import { gql, useQuery, useSubscription } from '@apollo/client';

export const GET_CURRENT_USER_BALANCE = gql`
  query balanced {
    balance {
      id
      balance
    }
  }
`;

export const BALANCE_SUBSCRIPTION = gql`
  subscription onBalanceChanged {
    balanceChanged {
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
  useSubscription(BALANCE_SUBSCRIPTION);

  return {
    loading,
    balance: data?.balance?.balance,
  };
}
