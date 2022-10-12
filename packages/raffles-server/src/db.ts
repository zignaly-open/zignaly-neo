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
import {
  DEFAULT_BENEFIT_DIRECT,
  DEFAULT_MAX_TOTAL_BENEFITS,
  DEFAULT_MAX_TOTAL_REWARDS,
  DEFAULT_REQ_MINIMUM_DEPOSIT,
  DEFAULT_REWARD_DIRECT,
} from './entities/codes/constants';
import { generateCode } from './entities/codes/util';

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
  await Code.create({
    name: generateCode(),
    welcomeType: true,
    userId: user.id,
    benefitDirect: DEFAULT_BENEFIT_DIRECT,
    rewardDirect: DEFAULT_REWARD_DIRECT,
    reqMinimumDeposit: DEFAULT_REQ_MINIMUM_DEPOSIT,
    maxTotalBenefits: DEFAULT_MAX_TOTAL_BENEFITS,
    maxTotalRewards: DEFAULT_MAX_TOTAL_REWARDS,
  });
});

const persistTablesToTheDatabase = () => sequelize.sync({ alter: true });

export { sequelize, persistTablesToTheDatabase };
