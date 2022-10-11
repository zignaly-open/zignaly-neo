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
import { Code, CodeRedemption } from './entities/codes/model';

const models = [
  User,
  Auction,
  AuctionBid,
  AuctionBasketItem,
  Setting,
  Payout,
  Code,
  CodeRedemption,
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
  // pg NOTIFY listener
  connect();
}

User.afterCreate(async (user) => {
  Code.create({
    name: user.referralCode,
    welcomeType: true,
    userId: user.id,
    benefitDirect: 10,
    rewardDirect: 10,
  });
});

const persistTablesToTheDatabase = () => sequelize.sync({ alter: true });

export { sequelize, persistTablesToTheDatabase };
