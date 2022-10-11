import sequelize from 'sequelize';
import { ContextUser } from '../../types';
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
    const r = await CodeRedemption.findAll();
    console.log(r);
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
    const redemptions = await CodeRedemption.count({
      where: { code: code.name },
    });
    if (redemptions >= code.maxRedemptions) {
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

const calculateInvitedBenefit = (code: Code) => {
  let invitedBenefit = code.benefitDirect;

  if (code.benefitBalanceFactor) {
    const balance = 100;
    invitedBenefit += code.benefitBalanceFactor * balance;
  }

  if (code.benefitDepositFactor) {
    const deposits = 90;
    invitedBenefit += code.benefitDepositFactor * deposits;
  }

  if (code.maxTotalBenefits && invitedBenefit > code.maxTotalBenefits) {
    invitedBenefit = code.maxTotalBenefits;
  }
  return invitedBenefit;
};

export const redeem = async (codeName: string, user: ContextUser) => {
  const code = await check(codeName, user);

  await CodeRedemption.create({
    code: codeName,
    invitedId: user.id,
    inviterId: code.userId,
    invitedBenefit: calculateInvitedBenefit(code),
    inviterBenefit: code.benefitDirect,
  });

  await Code.update(
    { currentRedemptions: sequelize.literal('currentRedemptions + 1') },
    { where: { name: code.name } },
  );
};
