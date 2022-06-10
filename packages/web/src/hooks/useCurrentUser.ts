import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './useAuthenticate';

export default function useCurrentUser() {
  const { loading, data: currentUser } = useQuery(GET_CURRENT_USER);
  return { user: currentUser?.me, loading };
}
