import sequelizeFixtures from 'sequelize-fixtures';
import '../../db';
import { Auction, AuctionBid, AuctionBasketItem } from '../auctions/model';
import { Payout } from '../payouts/model';
import { sequelize } from '../../db';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

(async () => {
  await sequelize.sync({ force: true });
  const transaction = await sequelize.transaction();
  const options = { raw: true, transaction };
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
  await AuctionBid.destroy({ where: {}, ...options });
  await Payout.destroy({ where: {}, ...options });
  await AuctionBasketItem.destroy({ where: {}, ...options });
  await Auction.destroy({ where: {}, ...options });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  await transaction.commit();

  sequelizeFixtures
    .loadFile(__dirname + '/sample-data.json', models)
    .catch((e) => {
      console.error(e);
    });
})();
