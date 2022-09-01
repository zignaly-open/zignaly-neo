import sequelizeFixtures from 'sequelize-fixtures';
import { sequelize, persistTablesToTheDatabase } from '../../db';
import { Payout } from '../payouts/model';
import { Auction, AuctionBasketItem, AuctionBid } from '../auctions/model';

const models = {
  Auction,
  AuctionBid,
  AuctionBasketItem,
};

const initDB = async (fileName: string) => {
  await persistTablesToTheDatabase();
  const transaction = await sequelize.transaction();
  const options = { raw: true, transaction };
  await AuctionBid.destroy({ where: {}, ...options });
  await Payout.destroy({ where: {}, ...options });
  await AuctionBasketItem.destroy({ where: {}, ...options });
  await Auction.destroy({ where: {}, ...options });
  await transaction.commit();
  sequelizeFixtures.loadFile(__dirname + '/' + fileName, models).catch((e) => {
    console.error(e);
  });
};

export default initDB;
