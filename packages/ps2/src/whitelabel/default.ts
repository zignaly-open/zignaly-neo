import { Features } from './type';

const defaultFeatureState: Record<Features, boolean> = {
  [Features.AccessLevels]: false,
  [Features.Rewards]: true,
  [Features.Referrals]: true,
  [Features.CreateService]: true,
  [Features.LoginOnlyAccess]: false,
  [Features.EmailVerification]: true,
  [Features.NewSignup]: true,
  [Features.Subscriptions]: false,
  [Features.MinInvestment]: false,
  [Features.Kyc]: false,
  [Features.ZScore]: true,
};

export default defaultFeatureState;
