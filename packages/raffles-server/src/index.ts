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
import * as auctions from './entities/auctions';
import * as users from './entities/users';
import * as payouts from './entities/payouts';
import * as codes from './entities/codes';
import * as settings from './entities/settings';
import listenToChain from './chain/watch';
import { expressjwt, Request as AuthorizedRequest } from 'express-jwt';
import { port, isTest, algorithm, secret, graphqlPath } from '../config';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { persistTablesToTheDatabase } from './db';

// persist models to the database
// TODO: maybe alter is not good on prod
!isTest && persistTablesToTheDatabase();

const typeDef = gql`
  type Query
  type Mutation
  type Subscription
`;
const app = express();
app.use(
  expressjwt({
    secret,
    algorithms: [algorithm],
    credentialsRequired: false,
  }),
);

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs: [
    typeDef,
    auctions.typeDef,
    users.typeDef,
    payouts.typeDef,
    codes.typeDef,
    settings.typeDef,
  ],
  resolvers: [
    auctions.resolvers,
    users.resolvers,
    payouts.resolvers,
    codes.resolvers,
    settings.resolvers,
  ],
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: graphqlPath,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  context: ({ req }: { req: AuthorizedRequest }) => {
    const user = req.auth?.payload || null;
    return { user };
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Install a landing page plugin based on NODE_ENV
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          footer: false,
        })
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

!process.env.DEV_ONLY_DISABLE_DEPOSIT_CHECKS && !isTest && listenToChain();

server.start().then(() => server.applyMiddleware({ app, path: graphqlPath }));

if (!isTest) {
  httpServer.listen({ port });
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
}

export default app;
