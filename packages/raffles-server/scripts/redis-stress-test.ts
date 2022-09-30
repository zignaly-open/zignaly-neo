import axios from 'axios';
import http from 'http';
import { port } from '../config';

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
});

const bid = (auctionId: string, token: string) => {
  return axios.post(
    `http://localhost:${port}/graphql`,
    {
      operationName: 'createBid',
      query: `
          mutation createBid($id: ID!) {
            bid(id: $id) {
              id
              title
              createdAt
              expiresAt
              bids {
                id
                value
                user {
                  id
                  username
                }
              }
            }
          }
        `,
      variables: { id: auctionId },
    },
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
      httpAgent,
    },
  );
};

(async () => {
  const args = process.argv.slice(2);
  const auctionId = args[0];
  const token = args[1];
  const bids = parseInt(args[2]) || 2;

  console.time('bid');

  const res = [] as number[];
  for (let i = 0; i < bids; i++) {
    bid(auctionId, token).then(() => {
      res.push(1);
    });
  }

  setInterval(() => {
    console.timeLog('bid', `done: ${res.length}`);
    if (res.length === bids) {
      process.exit();
    }
  }, 500);
})();
