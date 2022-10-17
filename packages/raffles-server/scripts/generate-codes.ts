import '../src/db';
import {
  DEFAULT_BENEFIT_DIRECT,
  DEFAULT_MAX_TOTAL_BENEFITS,
  DEFAULT_MAX_TOTAL_REWARDS,
  DEFAULT_REQ_MINIMUM_DEPOSIT,
  DEFAULT_REWARD_DIRECT,
} from '../src/entities/codes/constants';
import { Code } from '../src/entities/codes/model';
import { generateCode } from '../src/entities/codes/util';
import { User } from '../src/entities/users/model';

(async () => {
  const users = await User.findAll();
  for (const user of users) {
    await Code.create({
      code: generateCode(),
      welcomeType: true,
      userId: user.id,
      benefitDirect: DEFAULT_BENEFIT_DIRECT,
      rewardDirect: DEFAULT_REWARD_DIRECT,
      reqMinimumDeposit: DEFAULT_REQ_MINIMUM_DEPOSIT,
      maxTotalBenefits: DEFAULT_MAX_TOTAL_BENEFITS,
      maxTotalRewards: DEFAULT_MAX_TOTAL_REWARDS,
    });
  }
  process.exit();
})();
