import os from 'os';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/users/model';
import { Transaction } from './entities/transactions/model';
import {
  Auction,
  AuctionBid,
  AuctionBasketItem,
} from './entities/auctions/model';
import { postgresUrl } from '../config';
import { Setting } from './entities/setting/model';

const sequelize = new Sequelize(postgresUrl, {
  dialect: 'postgres',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false,
  models: [User, Transaction, Auction, AuctionBid, AuctionBasketItem, Setting],
});

// persist models to the database
// TODO: maybe alter is not good on prod
sequelize.sync({ alter: true });

export { sequelize };
