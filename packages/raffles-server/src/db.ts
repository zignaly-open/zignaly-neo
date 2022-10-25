import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/users/model';
import {
  Auction,
  AuctionBid,
  AuctionBasketItem,
} from './entities/auctions/model';
import { isTest, postgresUrl } from '../config';
import { Setting } from './entities/settings/model';
import { Payout } from './entities/payouts/model';
import { connect } from './redisAuctionWatcher';
import { Code, CodeRedemption } from './entities/codes/model';
import { generateCode } from './entities/codes/util';
import { getCodeSettings } from './entities/settings/service';

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
  const {
    benefitDirect,
    rewardDirect,
    reqMinimumDeposit,
    maxTotalBenefits,
    maxTotalRewards,
    benefitDepositFactor,
    rewardDepositFactor,
  } = await getCodeSettings();

  await Code.create({
    isDefault: true,
    code: generateCode(),
    welcomeType: true,
    userId: user.id,
    benefitDirect,
    rewardDirect,
    reqMinimumDeposit,
    maxTotalBenefits,
    maxTotalRewards,
    benefitDepositFactor,
    rewardDepositFactor,
  });
});

const persistTablesToTheDatabase = () => sequelize.sync({ alter: true });

export { sequelize, persistTablesToTheDatabase };
