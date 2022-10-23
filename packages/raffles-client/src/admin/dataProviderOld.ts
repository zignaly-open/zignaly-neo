import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { omit } from 'lodash';
import { GET_AUCTIONS } from 'queries/auctions';
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
  // headers: { 'x-graphql-token': 'YYY' },
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'ignore',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  // },
});

const fields = {
  posts: 'id title',
  authors: 'id name',
};

// https://marmelab.com/react-admin/DataProviderWriting.html#example-graphql-implementation
export const dataProvider = {
  getList: (resource, { sort, pagination, filter }) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;
    return client
      .query({
        query: GET_AUCTIONS,
        // variables: {
        //   limit: perPage,
        //   offset: (page - 1) * perPage,
        //   order_by: { [field]: order.toLowerCase() },
        //   where: Object.keys(filter).reduce(
        //     (prev, key) => ({
        //       ...prev,
        //       [key]: { _eq: filter[key] },
        //     }),
        //     {},
        //   ),
        // },
      })
      .then((result) => ({
        data: result.data[resource],
        total: result.data[resource].length,
      }));
    // .then((result) => ({
    //   data: result.data[resource],
    //   total: result.data[`${resource}_aggregate`].aggregate.count,
    // }));
  },
  getOne: (resource, params) => {
    return client
      .query({
        query: GET_AUCTIONS,
        variables: {
          id: params.id,
        },
      })
      .then((result) => ({ data: result.data[resource][0] }));
    // .then((result) => ({ data: result.data[`${resource}_by_pk`] }));
  },
  update: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($id: ID!, $data: ${resource}_set_input!) {
                update_${resource}_by_pk(id: $id, data: $data) {
                  id  
                  title
                }
            }`,
        variables: {
          id: params.id,
          data: omit(params.data, ['__typename', 'id', 'createdAt', 'bids']),
        },
      })
      .then((result) => ({
        data: result.data[`update_${resource}_by_pk`],
      }));
  },
};
