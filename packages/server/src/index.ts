import { ApolloServer, gql } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
  // ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import './db';
import * as auctions from './auctions';
import * as users from './users';
import { expressjwt, Request as AuthorizedRequest } from 'express-jwt';
import { algorithm, secret } from '../config';

const typeDef = gql`
  type Query
  type Mutation
  type Subscription
`;

const port = process.env.PORT || 4000;

(async () => {
  const app = express();
  app.use(
    expressjwt({
      secret,
      algorithms: [algorithm],
      credentialsRequired: false,
    }),
  );
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: [typeDef, auctions.typeDef, users.typeDef],
    resolvers: [auctions.resolvers, users.resolvers],
    csrfPrevention: true,
    context: ({ req }: { req: AuthorizedRequest }) => {
      const user = req.auth?.payload || null;
      return { user };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            footer: false,
          })
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
})();

export {};
