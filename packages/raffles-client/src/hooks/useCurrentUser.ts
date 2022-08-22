import { useQuery } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';
import { GetCurrentUserResponseModel } from 'queries/auctions';
import { GET_CURRENT_USER } from '../queries/users';

export interface CurrentUserModel {
  user?: UserType;
  loading: boolean;
}

export default function useCurrentUser(): CurrentUserModel {
  const { loading, data: currentUser }: GetCurrentUserResponseModel =
    useQuery(GET_CURRENT_USER);
  return {
    user: currentUser?.me,
    loading,
  };
}
