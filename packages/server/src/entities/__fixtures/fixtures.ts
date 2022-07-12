import { Op } from 'sequelize';
import sequelizeFixtures from 'sequelize-fixtures';
import '../../db';
import { Auction, AuctionBid, AuctionBasketItem } from '../auctions/model';
import { Transaction } from '../transactions/model';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

Transaction.destroy({
  where: {
    auctionId: {
      [Op.ne]: null,
    },
  },
});

AuctionBid.destroy({ where: {} });
AuctionBasketItem.destroy({ where: {} });
Auction.destroy({ where: {} });

sequelizeFixtures
  .loadFile(__dirname + '/sample-data.json', models)
  .catch((e) => {
    console.error(e);
  });
