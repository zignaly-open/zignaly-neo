export type ContextUser = {
  id: number;
  publicAddress: string;
};

export type ApolloContext = {
  user: ContextUser;
};

export type CybavoBalance = Record<string, { balance: string }>;
export type CybavoTransfer = { transaction_id: string };
