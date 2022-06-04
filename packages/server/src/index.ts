import { ApolloServer, gql } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageGraphQLPlayground,
    // ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import * as auctions from './auctions';


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
        typeDefs: [typeDef, auctions.typeDef],
        resolvers: [auctions.resolvers],
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),

            // Install a landing page plugin based on NODE_ENV
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageProductionDefault({
                    footer: false,
                })
                : ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    });
    await server.start();
    server.applyMiddleware({app});
    await new Promise<void>(resolve => httpServer.listen({port}, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
})();

export {};
