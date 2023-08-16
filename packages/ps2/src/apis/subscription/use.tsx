import { useSubscribeMutation, useSubscriptionsQuery } from './api';

export const useSubscriptions = (): typeof useSubscriptionsQuery =>
  useSubscriptionsQuery;

export function useSubscribe(): {
  isLoading: boolean;
  subscribe: ({
    subscriptionCode,
  }: {
    subscriptionCode: string;
  }) => Promise<void>;
} {
  const [subscribe, { isLoading }] = useSubscribeMutation();
  return {
    isLoading,
    subscribe: async ({ subscriptionCode }) => {
      await subscribe({ subscriptionCode }).unwrap();
    },
  };
}
