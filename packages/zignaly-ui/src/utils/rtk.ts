export type RtkQueryLike<TData extends object, TParams extends object> = (
  props: TParams,
  options: Record<string, any>,
) => {
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: unknown;
  refetch: () => void;
  data?: TData;
};
