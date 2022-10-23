import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';
import { setContext } from '@apollo/client/link/context';
import { getToken } from 'util/token';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const myBuildQuery = (introspection) => (fetchType, resource, params) => {
  const builtQuery = buildQuery(introspection)(fetchType, resource, params);

  if (resource === 'Code') {
    if (fetchType === 'GET_LIST') {
      return {
        ...builtQuery,
        parseResponse: (response: ApolloQueryResult<any>) => {
          const r = builtQuery.parseResponse(response);
          return {
            ...r,
            data: r.data.map((d) => ({
              ...d,
              id: d.code,
            })),
          };
        },
      };
    }
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
