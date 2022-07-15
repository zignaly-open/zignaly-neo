import { useQuery } from '@apollo/client';
import { UserType } from '@zigraffle/shared/types';
import { GET_CURRENT_USER } from './useAuthenticate';

export default function useCurrentUser() {
  const { loading, data: currentUser } = useQuery(GET_CURRENT_USER);
  const returnValue: { user: UserType; loading: boolean } = {
    user: currentUser?.me,
    loading,
  };
  return returnValue;
}
