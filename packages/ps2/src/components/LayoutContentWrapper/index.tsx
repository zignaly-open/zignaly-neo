import React, { ReactElement } from 'react';
import { CenteredLoader } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import CriticalError from '../Stub/CriticalError';
import NoData from '../Stub/NoData';
import { QueryReturnTypeBasic } from '../../util/queryReturnType';

type EndpointEsque = QueryReturnTypeBasic<unknown>;

/**
 * As you may have noticed, this has quite a similar notation to all the api hooks from RTK.
 * Coincidence? I do not think so
 */
const LayoutContentWrapper = <TData, TError>({
  endpoint,
  content,
  error,
  hasHeader,
  unmountOnRefetch = false,
  loading,
}: {
  endpoint: EndpointEsque | EndpointEsque[];
  content: (data: TData) => ReactElement;
  error?: (error: TError) => ReactElement;
  unmountOnRefetch?: boolean;
  hasHeader?: boolean;
  loading?: boolean;
}): ReactElement => {
  const isArray = Array.isArray(endpoint);
  const endpoints: EndpointEsque[] = isArray ? endpoint : [endpoint];
  const someError = endpoints.find((x) => x.error)?.error;
  const isLoading = endpoints.some((x) => x.isLoading) || loading;
  const isFetching = endpoints.some((x) => x.isFetching);
  const padded = (innerContent: JSX.Element) =>
    hasHeader ? <Box sx={{ mt: 7 }}>{innerContent}</Box> : innerContent;
  const data = endpoints.every((x) => x.data) && endpoints.map((x) => x.data);

  if (isLoading || (unmountOnRefetch && isFetching))
    return padded(<CenteredLoader />);
  if (someError && error) return error(someError as TError);
  if (someError) return padded(<CriticalError />);
  if (!data) return padded(<NoData />);
  return content((isArray ? data : data[0]) as unknown as TData);
};

export default LayoutContentWrapper;
