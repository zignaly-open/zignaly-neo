export type QueryReturnType<T> = {
  isFetching?: boolean;
  isLoading: boolean;
  error?: unknown;
  refetch: () => void;
  data?: T;
};

export type QueryReturnTypeBasic<T> = Omit<QueryReturnType<T>, 'refetch'>;
