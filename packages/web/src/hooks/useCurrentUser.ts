import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './useAuthenticate';

export default function useCurrentUser(): {
  user: {
    id: number;
    username: string;
    onboardingCompletedAt: Date;
  };
  loading: boolean;
} {
  const { loading, data: currentUser } = useQuery(GET_CURRENT_USER);
  return { user: currentUser?.me, loading };
}
