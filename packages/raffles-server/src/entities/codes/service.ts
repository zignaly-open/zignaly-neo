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
import { Code, CodeRedemption } from './model';

export const check = async (codeName: string, user: ContextUser) => {
  const code = await Code.findByPk(codeName);
  if (!code) {
    throw new Error('Code not found');
  }

  if (code.userId === user.id) {
    throw new Error('Not allowed');
  }

  if (code.welcomeType) {
    const redeemed = await CodeRedemption.count({
      where: { invitedId: user.id, '$codeInfo.welcomeType$': true },
      include: [Code],
    });

    if (redeemed > 0) {
      throw new Error('You have already redeemed a welcome code.');
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
      `You need to deposit at least ${code.reqMinimumDeposit}ZIGs.`,
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
      throw new Error('Maximum redemptions reached');
    }
  }

  if (code.startDate && new Date() < code.startDate) {
    throw new Error(`The code will start working on ${code.startDate}`);
  }

  if (code.endDate && new Date() > code.endDate) {
    throw new Error('The code is expired');
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
  let invitedBenefit = code.benefitDirect;

  if (code.benefitBalanceFactor) {
    invitedBenefit += code.benefitBalanceFactor * balance;
  }

  if (code.benefitDepositFactor) {
    invitedBenefit += code.benefitDepositFactor * deposits;
  }

  if (code.maxTotalBenefits && invitedBenefit > code.maxTotalBenefits) {
    invitedBenefit = code.maxTotalBenefits;
  }
  return invitedBenefit;
};

const calculateInviterBenefit = (code: Code, invitedBenefit: number) => {
  if (!code.userId) return 0; // system code

  let inviterBenefit = code.rewardDirect + invitedBenefit * code.rewardFactor;
  if (code.maxTotalRewards && inviterBenefit > code.maxTotalRewards) {
    inviterBenefit = code.maxTotalRewards;
  }
  return inviterBenefit;
};

export const redeem = async (codeName: string, user: ContextUser) => {
  const { code, balance, deposits } = await check(codeName, user);
  try {
    const invitedBenefit = await calculateInvitedBenefit(
      code,
      balance,
      deposits,
    );
    const inviterBenefit = calculateInviterBenefit(code, invitedBenefit);

    if (invitedBenefit > 0) {
      await internalTransfer(
        zignalySystemId,
        user.publicAddress,
        invitedBenefit.toString(),
        TransactionType.RedeemCode,
        true,
      );
    }

    if (inviterBenefit > 0) {
      const inviter = await User.findByPk(code.userId);
      await internalTransfer(
        zignalySystemId,
        inviter.publicAddress,
        inviterBenefit.toString(),
        TransactionType.ReferralCode,
        true,
      );
    }

    await CodeRedemption.create({
      code: codeName,
      invitedId: user.id,
      inviterId: code.userId,
      invitedBenefit,
      inviterBenefit,
    });

    await Code.update(
      { currentRedemptions: sequelize.literal('currentRedemptions + 1') },
      { where: { name: code.name } },
    );

    return invitedBenefit;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
