import sequelize from 'sequelize';
import { zignalySystemId } from '../../../config';
import {
  getUserBalance,
  getUserDeposits,
  internalTransfer,
} from '../../cybavo';
import { ContextUser, TransactionType } from '../../types';
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

  if (code.reqMinimumBalance > 0) {
    // todo
  }

  if (code.reqMinimumDeposit > 0) {
    // todo
    // Check deposits
    if (code.reqDepositFrom) {
    }
  }

  if (code.reqMinAuctions > 0) {
    // todo
  }

  if (code.reqWalletType) {
    // todo
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

  return code;
};

const calculateInvitedBenefit = async (code: Code, user: ContextUser) => {
  let invitedBenefit = code.benefitDirect;

  if (code.benefitBalanceFactor) {
    const balance = await getUserBalance(user.publicAddress);
    invitedBenefit += code.benefitBalanceFactor * parseFloat(balance);
  }

  if (code.benefitDepositFactor) {
    const deposits = (await getUserDeposits(user.publicAddress)).reduce(
      (total, d) =>
        total +
        (!code.reqDepositFrom || new Date(d.created_at) > code.reqDepositFrom
          ? d.amount
          : 0),
      0,
    );
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
  const code = await check(codeName, user);
  try {
    const invitedBenefit = await calculateInvitedBenefit(code, user);
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
