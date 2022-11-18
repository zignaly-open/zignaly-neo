import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { UserType } from '@zignaly-open/raffles-shared/types';
import {
  GetCurrentUserResponseModel,
  GET_CURRENT_USER,
} from 'config/apollo/queries';
import { useAppDispatch } from 'state/hooks';
import { getToken } from 'util/token';
import { updateCurrentUser } from 'state/user/reducer';

export interface CurrentUserModel {
  user?: UserType;
  loading: boolean;
}

export default function useCurrentUser(): CurrentUserModel {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { loading, data: currentUser }: GetCurrentUserResponseModel = useQuery(
    GET_CURRENT_USER,
    {
      skip: !account || !getToken(),
    },
  );

  useEffect(() => {
    if (currentUser)
      dispatch(updateCurrentUser({ currentUser: currentUser?.me }));
  }, [currentUser]);

  return {
    user: currentUser?.me,
    loading,
  };
}
