import { useWlConfigQuery } from 'apis/config/api';

export function useCurrentWlConfig(): ReturnType<typeof useWlConfigQuery> {
  return useWlConfigQuery('z01');
}
