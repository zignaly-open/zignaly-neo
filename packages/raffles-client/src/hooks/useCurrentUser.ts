import { useQuery } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';
import { GET_CURRENT_USER } from 'queries/users';

export default function useCurrentUser(): { user: UserType; loading: boolean } {
  const { loading, data: currentUser } = useQuery(GET_CURRENT_USER);
  return {
    user: currentUser?.me,
    loading,
  };
}
