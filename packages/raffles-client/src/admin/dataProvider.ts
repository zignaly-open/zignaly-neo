import {
  ApolloLink,
  ApolloQueryResult,
  createHttpLink,
  gql,
  ServerError,
} from '@apollo/client';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';
import { setContext } from '@apollo/client/link/context';
import { getToken } from 'util/token';
import { IntrospectionResult } from 'ra-data-graphql';
import { CodeInfo } from 'components/Modals/RedeemCode/types';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ networkError }) => {
  if ((networkError as ServerError).statusCode === 401) {
    window.location.assign('/');
  }
});

const resourcesMap = {
  auctions: 'Auction',
  codes: 'Code',
  users: 'User',
};

const myBuildQuery =
  (introspection: IntrospectionResult) =>
  (fetchType: string, resourceId: string, params: { id: string }) => {
    // Get actual resource name instead of the name we use in urls
    let resource = resourcesMap[resourceId] ?? resourceId;
    if (resource === 'Auction' && ['GET_LIST', 'GET_ONE'].includes(fetchType)) {
      // Special resource name for GET Auction admin endpoint, different than regular one
      resource = 'AdmAuction';
    }

    const builtQuery = buildQuery(introspection)(fetchType, resource, params);

    if (resource === 'Code') {
      if (fetchType === 'GET_LIST') {
        // Add code as id to response
        return {
          ...builtQuery,
          parseResponse: (response: ApolloQueryResult<CodeInfo[]>) => {
            const r = builtQuery.parseResponse(response);
            return {
              ...r,
              data: r.data.map((d: CodeInfo) => ({
                ...d,
                id: d.code,
              })),
            };
          },
        };
      }

      if (
        fetchType === 'GET_ONE' ||
        fetchType === 'UPDATE' ||
        fetchType === 'CREATE'
      ) {
        // Add code as id to response
        return {
          ...builtQuery,
          parseResponse: (response: ApolloQueryResult<CodeInfo>) => {
            const r = builtQuery.parseResponse(response);
            return {
              ...r,
              data: { ...r.data, id: r.data.code },
            };
          },
        };
      }
    }

    if (resource === 'Settings') {
      // Add id to settings reply
      return {
        ...builtQuery,
        parseResponse: (response: ApolloQueryResult<{ data: object }>) => {
          const { data } = response.data;
          return {
            data: { ...data, id: undefined as number },
          };
        },
      };
    }

    // Mutation for deletion
    if (fetchType === 'DELETE') {
      return {
        ...builtQuery,
        query: gql`
          mutation ($id: ID!) {
            delete${resource}(id: $id)
          }
        `,
        variables: {
          id: params.id,
        },
        parseResponse: () => {
          return { data: { id: params.id } };
        },
      };
    }

    return builtQuery;
  };

export default () =>
  buildGraphQLProvider({
    clientOptions: {
      link: ApolloLink.from([authLink, errorLink, httpLink]),
    },
    // introspection: {
    //   include: ['AuctionAdmin'],
    // },
    buildQuery: myBuildQuery,
  });
