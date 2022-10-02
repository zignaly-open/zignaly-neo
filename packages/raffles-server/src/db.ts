import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/users/model';
import {
  Auction,
  AuctionBid,
  AuctionBasketItem,
} from './entities/auctions/model';
import { isTest, postgresUrl } from '../config';
import { Setting } from './entities/setting/model';
import { Payout } from './entities/payouts/model';
import { connect } from './redisAuctionWatcher';

const models = [User, Auction, AuctionBid, AuctionBasketItem, Setting, Payout];

let sequelize: Sequelize;

if (isTest) {
  sequelize = new Sequelize('sqlite::memory:', { logging: false, models });
} else {
  sequelize = new Sequelize(postgresUrl, {
    dialect: 'postgres',
    logging: false,
    models,
  });
  // pg NOTIFY listener
  connect();
}

const persistTablesToTheDatabase = () => sequelize.sync({ alter: true });

export { sequelize, persistTablesToTheDatabase };
