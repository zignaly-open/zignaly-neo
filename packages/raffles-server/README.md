# Zignaly Raffles Client

### How to run

You will need node 16, I suggest you use nvm. Just run `nvm use`.

I assume you already have all dependencies installed from the `lerna bootstrap` step. What next?

```
docker-compose -f docker-compose.dev.yml up
```


This will start postgres, redis and an adminer as a bonus.

Next we configure
the `.env` file. Easy way - just take it from `.env.sample`. If you prefer harder ways:

* `POSTGRES_URL` - you can run a simple postgres docker container, that'd
  do: `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres` 
* `RPC_URL` - infura HTTP API
* `RPC_SOCKET_URL` - infura Websocket API
* `RECEIVING_ACCOUNT` - same as `REACT_APP_RECEIVING_ADDRESS`. Those two should match. TODO: move thayt feom .env to a
  hardcoded value in `packages/shared` for security purposes
* `CONTRACT_ADDRESS` - same as `REACT_APP_CONTRACT_ADDRESS`. Those two should match.
* `ALGORITHM` - algorithm for JWT, default `'HS256'`
* `SECRET` - JWT secret
* `DEV_ONLY_DISABLE_DEPOSIT_CHECKS` - stop checking chain to avoid unnecessary requests to
* `NUMBER_OF_CONFIRMATIONS_REQUIRED` - number of confirmations required to approve a transaction

Now we populate the DB.

```
cd packages/raffles-server && npx ts-node src/entities/__fixtures/fixtures_short.ts
```


Now run `yarn dev` to start a `nodemon`.

What commands you could need?

* `yarn dev` to launch a dev server, already mentioned it
* `yarn lint` to check lint issues
* `yarn start` to launch a server, you're supposed to use that in prod
* `yarn test` to... yes, you guessed it, test
