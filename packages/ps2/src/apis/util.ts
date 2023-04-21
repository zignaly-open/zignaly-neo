import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import baseApiPs2 from './baseApiPs2';

export const providesList = <
  R extends { [K in P]: string | number }[],
  T extends string,
  P extends string,
>(
  resultsWithIds: R | undefined,
  tagType: T,
  idKey = 'id' as P,
) => {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map((r) => ({ type: tagType, id: r[idKey] })),
      ]
    : [{ type: tagType, id: 'LIST' }];
};

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
    overrideExisting: module.hot?.status() === 'apply',
    endpoints,
  });
};
