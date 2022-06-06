export type ContextUser = {
  id: number;
  publicAddress: string;
};

export type ApolloContext = {
  user: ContextUser;
};
