import sequelizeFixtures from 'sequelize-fixtures';
import '../db';
import { Auction, AuctionBid, AuctionBasketItem } from '../auctions/model';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

sequelizeFixtures
  .loadFile(__dirname + '/sample-data.json', models)
  .catch((e) => {
    console.error(e);
  });
