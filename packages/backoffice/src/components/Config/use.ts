import { useSaveWlConfigMutation, useWlConfigQuery } from 'apis/config/api';
import { WhitelabelConfig } from '../../apis/config/types';

export function useCurrentWlConfig(): ReturnType<typeof useWlConfigQuery> {
  return useWlConfigQuery('z01');
}

export function useSaveCurrentWlConfig(): [
  (
    payload: Partial<WhitelabelConfig>,
  ) => ReturnType<ReturnType<typeof useSaveWlConfigMutation>[0]>,
  ReturnType<typeof useSaveWlConfigMutation>[1],
] {
  const { data: originalValue } = useCurrentWlConfig();
  const [action, state] = useSaveWlConfigMutation();
  return [
    (data) =>
      action({
        slug: 'z01',
        data: {
          ...(originalValue || {}),
          ...data,
        },
      }),
    state,
  ];
}
