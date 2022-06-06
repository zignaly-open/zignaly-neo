import os from 'os';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/model';
import { Transaction } from './transactions/model';
import { Auction, AuctionBid, AuctionBasketItem } from './auctions/model';
import { postgresUrl } from '../config';

const sequelize = new Sequelize(postgresUrl, {
  dialect: 'postgres',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false,
  models: [User, Transaction, Auction, AuctionBid, AuctionBasketItem],
});

// persist models to the database
sequelize.sync();

export { sequelize };
