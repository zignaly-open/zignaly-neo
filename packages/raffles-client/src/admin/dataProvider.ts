import { ApolloQueryResult, createHttpLink, gql } from '@apollo/client';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';
import { setContext } from '@apollo/client/link/context';
import { getToken } from 'util/token';
import { IntrospectionResult } from 'ra-data-graphql';
import { CodeInfo } from 'components/Modals/RedeemCode/types';

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

const myBuildQuery =
  (introspection: IntrospectionResult) =>
  (fetchType: string, resource: string, params: { id: string }) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource, params);
    if (resource === 'Code') {
      if (fetchType === 'GET_LIST') {
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
      } else if (
        fetchType === 'GET_ONE' ||
        fetchType === 'UPDATE' ||
        fetchType === 'CREATE'
      ) {
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
    } else if (resource === 'Settings') {
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

    if (fetchType === 'DELETE') {
      return {
        ...builtQuery,
        query: gql`
        mutation ($id: ID!) {
          delete${resource}(id: $id)
        }`,
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
      link: authLink.concat(httpLink),
    },
    // introspection: {
    //   include: ['Auction', 'User', 'Code'],
    // },
    buildQuery: myBuildQuery,
  });
