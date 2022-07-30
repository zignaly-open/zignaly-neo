# Zignaly Raffles Client

### How to run

You will need node 16, I suggest you use nvm. Just run `nvm use`.

I assume you already have all dependencies installed from the `lerna bootstrap` step. What next? Next we configure
the `.env` file.

* `REACT_APP_GRAPHQL` - backend's GraphQL HTTP endpoint. Remove that line altogether to use the default one (will work
  with the backend runninn out of the box)
* `REACT_APP_GRAPHQL_WS` - backend's GraphQL Websocket endpoint. Remove that line altogether to use the default one (
  will work with the backend runninn out of the box)
* `REACT_APP_ALCHEMY_PROJECT_ID` - surprisingly, it's alchemy project id
* `REACT_APP_RECEIVING_ADDRESS` - this is the address to which the payments will go (all the profits)
* `REACT_APP_CONTRACT_ADDRESS` - contract address for the token that we accept as a payment
* `REACT_APP_USE_RINKEBY_CHAIN` - whether or not we should use Rinkeby

Now just run `yarn start` and open [http://localhost:3000](http://localhost:3000).

This being a CRA app:

* `yarn test` - [runs tests](https://facebook.github.io/create-react-app/docs/running-tests)
* `yarn build` - builds the app for production to the `build` folder
* `yarn eject` - if you do not know what this is do not run it

Please follow the existing codestyle. Good luck on your journey.
