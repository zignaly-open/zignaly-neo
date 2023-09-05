import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import baseApiPs2 from './baseApiPs2';

/**
 * Extend api endpoints, and throw error if endpoint already exists
 * @param base Base api
 * @param endpoints New endpoints
 * @returns Extended api
 */
export const injectEndpoints = <
  T extends typeof baseApiPs2,
  E extends EndpointDefinitions,
>(
  base: T,
  endpoints: (
    b: Parameters<Parameters<T['injectEndpoints']>[0]['endpoints']>[0],
  ) => E,
) => {
  const evaluatedEndpoints = endpoints({
    query: () => null,
    mutation: () => null,
  });

  if (process.env.NODE_ENV !== 'production') {
    for (const [endpointName] of Object.entries(evaluatedEndpoints)) {
      if (endpointName in base.endpoints) {
        throw new Error(`Endpoint ${endpointName} already exists`);
      }
    }
  }
  return base.injectEndpoints({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    overrideExisting: module?.hot?.status?.() === 'apply',
    endpoints,
  });
};
