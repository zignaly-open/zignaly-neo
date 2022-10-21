import sequelize from 'sequelize';
import { zignalySystemId } from '../../../config';
import {
  getUserBalance,
  getUserDeposits,
  internalTransfer,
} from '../../cybavo';
import { ContextUser, TransactionType } from '../../types';
import { AuctionBid } from '../auctions/model';
import { User } from '../users/model';
import { emitBalanceChanged } from '../users/util';
import { Code, CodeRedemption } from './model';
import BN from 'bignumber.js';
import { format } from 'date-fns';

export const check = async (codeName: string, user: ContextUser) => {
  const code = await Code.findByPk(codeName?.toUpperCase());
  if (!code) {
    throw new Error('Code not found.');
  }

  if (code.userId === user.id) {
    throw new Error('Not allowed.');
  }

  if (code.welcomeType) {
    const redeemed = await CodeRedemption.count({
      where: { invitedId: user.id, '$codeInfo.welcomeType$': true },
      include: [Code],
    });

    if (redeemed > 0) {
      throw new Error('You have already redeemed a welcome code.');
    }
  } else {
    const redeemed = await CodeRedemption.count({
      where: { invitedId: user.id, code: code.code },
    });

    if (redeemed > 0) {
      throw new Error('You have already redeemed this code.');
    }
  }

  const balance = parseFloat(await getUserBalance(user.publicAddress));
  const deposits = await getDepositsTotal(code, user);

  if (code.reqMinimumBalance > 0 && balance < code.reqMinimumBalance) {
    throw new Error(
      `You need a balance of at least ${code.reqMinimumBalance}.`,
    );
  }

  if (code.reqMinimumDeposit > 0 && deposits < code.reqMinimumDeposit) {
    throw new Error(
      `You need to deposit at least ${code.reqMinimumDeposit} ZIG.${
        code.reqDepositFrom
          ? `\nOnly deposits after ${format(
              code.reqDepositFrom,
              'yyyy-MM-dd hh:mmaaa',
            )} UTC are valid.`
          : ''
      }`,
    );
  }

  if (code.reqMinAuctions > 0) {
    const auctionsCount = await AuctionBid.count({
      where: { userId: user.id },
    });
    if (auctionsCount < code.reqMinAuctions) {
      throw new Error(
        `You need to participate in at least ${code.reqMinAuctions} auctions.`,
      );
    }
  }

  if (code.reqWalletType) {
    const userInfo = await User.findByPk(user.id);
    if (userInfo.walletType !== code.reqWalletType) {
      throw new Error(`You need a ${code.reqWalletType} wallet.`);
    }
  }

  if (code.maxRedemptions > 0) {
    if (code.currentRedemptions >= code.maxRedemptions) {
      throw new Error('Maximum redemptions reached.');
    }
  }

  if (code.startDate && new Date() < code.startDate) {
    throw new Error(
      `The code will start working on ${format(
        code.startDate,
        'yyyy-MM-dd hh:mmaaa',
      )} UTC.`,
    );
  }

  if (code.endDate && new Date() > code.endDate) {
    throw new Error('The code is expired.');
  }

  return { code, balance, deposits };
};

const getDepositsTotal = async (code: Code, user: ContextUser) => {
  return (await getUserDeposits(user.publicAddress)).reduce(
    (total, d) =>
      total +
      (!code.reqDepositFrom || new Date(d.created_at) > code.reqDepositFrom
        ? d.amount
        : 0),
    0,
  );
};

const calculateInvitedBenefit = async (
  code: Code,
  balance: number,
  deposits: number,
) => {
  const balanceBenefit = new BN(balance).times(code.benefitBalanceFactor || 0);
  const depositsBenefit = new BN(deposits).times(
    code.benefitDepositFactor || 0,
  );
  let invitedBenefit = new BN(code.benefitDirect || 0)
    .plus(balanceBenefit)
    .plus(depositsBenefit);
  if (
    code.maxTotalBenefits &&
    invitedBenefit.gt(new BN(code.maxTotalBenefits))
  ) {
    invitedBenefit = new BN(code.maxTotalBenefits);
  }

  return invitedBenefit.toString();
};

const calculateInviterBenefit = (
  code: Code,
  invitedBenefit: string,
  deposits: number,
) => {
  if (!code.userId) return '0'; // system code

  const depositsBenefit = new BN(deposits).times(code.rewardDepositFactor || 0);

  let inviterBenefit = new BN(code.rewardDirect || 0)
    .plus(new BN(invitedBenefit).times(code.rewardFactor || 0))
    .plus(depositsBenefit);

  if (code.maxTotalRewards && inviterBenefit.gt(new BN(code.maxTotalRewards))) {
    inviterBenefit = new BN(code.maxTotalRewards);
  }
  return inviterBenefit.toString();
};

export const redeem = async (codeName: string, user: ContextUser) => {
  const { code, balance, deposits } = await check(codeName, user);
  const invitedBenefit = await calculateInvitedBenefit(code, balance, deposits);
  const inviterBenefit = calculateInviterBenefit(
    code,
    invitedBenefit,
    deposits,
  );

  if (parseFloat(invitedBenefit) > 0) {
    await internalTransfer(
      zignalySystemId,
      user.publicAddress,
      invitedBenefit,
      TransactionType.RedeemCode,
      true,
    );
    console.log(`User ${user.id} redeemed ${invitedBenefit} ZIGs`);
    await emitBalanceChanged(user);
  }

  if (parseFloat(inviterBenefit) > 0) {
    try {
      const inviter = await User.findByPk(code.userId);
      await internalTransfer(
        zignalySystemId,
        inviter.publicAddress,
        inviterBenefit,
        TransactionType.ReferralCode,
        true,
      );
      console.log(`User ${inviter.id} got rewarded ${inviterBenefit} ZIGs`);
      await emitBalanceChanged(inviter);
    } catch (e) {
      console.error(
        `Couldn't transfer ${inviterBenefit} to ${code.userId}, ${e}`,
      );
    }
  }

  await CodeRedemption.create({
    code: codeName,
    invitedId: user.id,
    inviterId: code.userId,
    invitedBenefit,
    inviterBenefit,
  });

  await Code.update(
    { currentRedemptions: sequelize.literal('"currentRedemptions" + 1') },
    { where: { code: code.code } },
  );

  return invitedBenefit;
};

export const userCodes = async (user: ContextUser) => {
  return Code.findAll({ where: { userId: user.id } });
};

export const userCodesRedemptions = async (user: ContextUser) => {
  return CodeRedemption.findAll({
    where: { inviterId: user.id },
    include: { model: User, as: 'invited' },
  });
};
