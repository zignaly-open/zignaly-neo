import sequelizeFixtures from 'sequelize-fixtures';
import '../../db';
import { Auction, AuctionBid, AuctionBasketItem } from '../auctions/model';
import { Payout } from '../payouts/model';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

Payout.destroy({ where: {} });
AuctionBid.destroy({ where: {} });

AuctionBasketItem.destroy({ where: {} });
Auction.destroy({ where: {} });

sequelizeFixtures
  .loadFile(__dirname + '/sample-data-long-expiry.json', models)
  .catch((e) => {
    console.error(e);
  });
