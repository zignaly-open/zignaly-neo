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
import serveStatic from 'serve-static';
import * as auctions from './auctions';
import * as users from './users';

const typeDef = gql`
  type Query
  type Mutation
  type Subscription
`;

const port = 4000;

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: [typeDef, auctions.typeDef, users.typeDef],
    resolvers: [auctions.resolvers, users.resolvers],
    csrfPrevention: true,
    // context: ({ req }) => {
    //   // Note: This example uses the `req` argument to access headers,
    //   // but the arguments received by `context` vary by integration.
    //   // This means they vary for Express, Koa, Lambda, etc.
    //   //
    //   // To find out the correct arguments for a specific integration,
    //   // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
    //
    //   // Get the user token from the headers.
    //   const token = req.headers.authorization || '';
    //
    //   // Try to retrieve a user with the token
    //   const user = getUser(token);
    //
    //   // Add the user to the context
    //   return { user };
    // },
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

  // TODO: remove self-serving the ui code for heroku
  app.use(serveStatic(__dirname + '/../../web/build'));

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
})();

export {};
