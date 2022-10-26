import { Op } from 'sequelize';
import {
  DEFAULT_BENEFIT_DEPOSIT_FACTOR,
  DEFAULT_BENEFIT_DIRECT,
  DEFAULT_MAX_TOTAL_BENEFITS,
  DEFAULT_MAX_TOTAL_REWARDS,
  DEFAULT_REQ_MINIMUM_DEPOSIT,
  DEFAULT_REWARD_DEPOSIT_FACTOR,
  DEFAULT_REWARD_DIRECT,
} from '../codes/constants';
import { Code } from '../codes/model';
import { CONFIG_LAST_PROCESSED_BLOCK } from './constants';
import { Setting } from './model';
import { CodeSettings } from './types';

const blackList = [CONFIG_LAST_PROCESSED_BLOCK];

export const getCodeSettings = async (): Promise<CodeSettings> => {
  const settings = await Setting.findAll({
    where: { key: { [Op.notIn]: blackList } },
  });
  return settings.reduce(
    (acc, s) => {
      return { ...acc, [s.key]: s.value };
    },
    {
      benefitDirect: DEFAULT_BENEFIT_DIRECT,
      rewardDirect: DEFAULT_REWARD_DIRECT,
      reqMinimumDeposit: DEFAULT_REQ_MINIMUM_DEPOSIT,
      maxTotalBenefits: DEFAULT_MAX_TOTAL_BENEFITS,
      maxTotalRewards: DEFAULT_MAX_TOTAL_REWARDS,
      benefitDepositFactor: DEFAULT_BENEFIT_DEPOSIT_FACTOR,
      rewardDepositFactor: DEFAULT_REWARD_DEPOSIT_FACTOR,
    },
  );
};

export const updateCodeSettings = async (data: CodeSettings) => {
  const settings = Object.keys(data)
    .filter((key) => !blackList.includes(key))
    .map((key) => ({
      key,
      value: data[key],
    }));
  await Setting.bulkCreate(settings, {
    updateOnDuplicate: ['value'],
  });

  // Update existing user default codes
  await Code.update(
    {
      benefitDirect: data.benefitDirect,
      rewardDirect: data.rewardDirect,
      reqMinimumDeposit: data.reqMinimumDeposit,
      maxTotalBenefits: data.maxTotalBenefits,
      maxTotalRewards: data.maxTotalRewards,
      benefitDepositFactor: data.benefitDepositFactor,
      rewardDepositFactor: data.rewardDepositFactor,
    },
    {
      where: { isDefault: true },
    },
  );

  return getCodeSettings();
};
