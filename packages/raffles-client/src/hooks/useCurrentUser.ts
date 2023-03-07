import { useQuery, useSubscription } from '@apollo/client';
import { useEthers } from '@usedapp/core';
import { UserType } from '@zignaly-open/raffles-shared/types';
import { GetCurrentUserResponseModel } from 'queries/auctions';
import { getToken } from 'util/token';
import { GET_CURRENT_USER, EMAIL_SUBSCRIPTION } from '../queries/users';

export interface CurrentUserModel {
  user?: UserType;
  loading: boolean;
}

export default function useCurrentUser(): CurrentUserModel {
  const { account } = useEthers();
  const { loading, data: currentUser }: GetCurrentUserResponseModel = useQuery(
    GET_CURRENT_USER,
    {
      skip: !account || !getToken(),
    },
  );

  return {
    user: currentUser?.me,
    loading,
  };
}

export function useEmailSubscription(): void {
  useSubscription(EMAIL_SUBSCRIPTION, {
    variables: {
      token: getToken(),
    },
    skip: !getToken(),
  });
}
