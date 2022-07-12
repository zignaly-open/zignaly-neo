# Zigraffle

### Checklist

MVP
- [x] Sockets
- [x] Proper Database connection - Postgres
- [x] Balance processing
- [x] Auctions -> DB
- [x] Bidding system
- [ ] Winning bid should gove a claim ability
- [ ] Multi-winner
- [ ] Polygon net only

A little bit later
- [ ] Tests for the love of God
- [ ] Toasts for errors
- [ ] Server eslint
- [x] Manage Profile
- [ ] Winner payouts
- [ ] At least half-decent design

Later:
- [ ] PubSub -> Redis or Kafka
- [ ] DB Indices
- [ ] Security Audit


### How to run

You will need node 16, I suggest you use nvm. Just run `nvm use`.

OK what next? in `packages/web` do `cp .env.sample .env`. We have 5 fields there:

* `REACT_APP_GRAPHQL` - backend's GraphQL HTTP endpoint. Remove that line altogether to use the default one (will work with the backend runninn out of the box)
* `REACT_APP_GRAPHQL_WS` - backend's GraphQL Websocket endpoint. Remove that line altogether to use the default one (will work with the backend runninn out of the box)
* `REACT_APP_INFURA_PROJECT_ID` - surprisingly, it's infura project id
* `REACT_APP_RECEIVING_ADDRESS` - this is the address to which the payments will go (all the profits)
* `REACT_APP_CONTRACT_ADDRESS` - contract address for the token that we accept as a payment

You will obviously need to install dependencies with `yarn`.

To run the frontend, from the top-level `package.json` run `yarn run frontend`;

In `packages/server` do `cp .env.sample .env`. We have 5 fields there:

* `POSTGRES_URL` - you can run a simple postgres docker container, that'd do: `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres`
* `RPC_URL` - infura HTTP API
* `RPC_SOCKET_URL` - infura Websocket API
* `RECEIVING_ACCOUNT` - same as `REACT_APP_RECEIVING_ADDRESS`. Those two should match. TODO: move thayt feom .env to a hardcoded value in `packages/shared` for security purposes 
* `CONTRACT_ADDRESS` - same as `REACT_APP_CONTRACT_ADDRESS`. Those two should match.
* `ALGORITHM` - algorithm for JWT, default `'HS256'`
* `SECRET` - JWT secret
* `NUMBER_OF_CONFIRMATIONS_REQUIRED` - number of confirmations required to approve a transaction


You will obviously need to install dependencies with `yarn`.

To run the frontend, from the top-level `package.json` run `yarn run backend`.

Looking at an empty list is boring, so do `cd packages/server && npx ts-node src/entities/__fixtures/fixtures.ts`

That's it.
