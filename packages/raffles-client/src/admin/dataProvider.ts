import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GET_AUCTIONS } from 'queries/auctions';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
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
};
