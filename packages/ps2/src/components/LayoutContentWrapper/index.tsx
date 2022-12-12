import React, { ReactElement } from 'react';
import CenteredLoader from '../CenteredLoader';
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
}: {
  endpoint: EndpointEsque | EndpointEsque[];
  content: (data: TData) => ReactElement;
  error?: (error: TError) => ReactElement;
}): ReactElement => {
  const isArray = Array.isArray(endpoint);
  const endpoints: EndpointEsque[] = isArray ? endpoint : [endpoint];
  const someError = endpoints.find((x) => x.error)?.error;
  const isLoading = endpoints.some((x) => x.isLoading);
  const data = endpoints.every((x) => x.data) && endpoints.map((x) => x.data);

  if (isLoading) return <CenteredLoader />;
  if (someError && error) return error(someError as TError);
  if (someError) return <CriticalError />;
  if (!data) return <NoData />;
  return content((isArray ? data : data[0]) as unknown as TData);
};

export default LayoutContentWrapper;
