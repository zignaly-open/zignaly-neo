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
  console.log('a');
  const builtQuery = buildQuery(introspection)(fetchType, resource, params);

  console.log('q', builtQuery);

  if (fetchType === 'UPDATE') {
    console.log(builtQuery);
  }
  if (resource === 'Command' && fetchType === 'GET_ONE') {
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: gql`
        query Command($id: ID!) {
          data: Command(id: $id) {
            id
            reference
            customer {
              id
              firstName
              lastName
            }
          }
        }
      `,
    };
  }

  return builtQuery;
};

export default () =>
  buildGraphQLProvider({
    clientOptions: {
      link: authLink.concat(httpLink),
    },
    introspection: {
      include: ['Auction'],
    },
    buildQuery: myBuildQuery,
  });
