import sequelizeFixtures from 'sequelize-fixtures';
import '../../db';
import { Auction, AuctionBid, AuctionBasketItem } from '../auctions/model';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

AuctionBid.destroy({ where: {} });
AuctionBasketItem.destroy({ where: {} });
Auction.destroy({ where: {} });

sequelizeFixtures
  .loadFile(__dirname + '/sample-data.json', models)
  .catch((e) => {
    console.error(e);
  });
