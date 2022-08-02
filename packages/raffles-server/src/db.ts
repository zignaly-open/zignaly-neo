import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/users/model';
import { Transaction } from './entities/transactions/model';
import {
  Auction,
  AuctionBid,
  AuctionBasketItem,
} from './entities/auctions/model';
import { isTest, postgresUrl } from '../config';
import { Setting } from './entities/setting/model';
import { Payout } from './entities/payouts/model';

const models = [
  User,
  Transaction,
  Auction,
  AuctionBid,
  AuctionBasketItem,
  Setting,
  Payout,
];

let sequelize: Sequelize;

if (isTest) {
  sequelize = new Sequelize('sqlite::memory:', { logging: false, models });
} else {
  sequelize = new Sequelize(postgresUrl, {
    dialect: 'postgres',
    logging: false,
    models,
  });
}

const persistTablesToTheDatabase = () => sequelize.sync({ alter: true });
// persist models to the database
// TODO: maybe alter is not good on prod
!isTest && persistTablesToTheDatabase();

export { sequelize, persistTablesToTheDatabase };
