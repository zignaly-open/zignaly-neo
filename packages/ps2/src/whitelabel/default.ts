import { Features } from './type';

const defaultFeatureState: Record<Features, boolean> = {
  [Features.AccessLevels]: true,
  [Features.Rewards]: true,
  [Features.Referrals]: true,
  [Features.Trader]: true,
  [Features.NewSignup]: true,
  [Features.Subscriptions]: true,
  [Features.Kyc]: false,
};

export default defaultFeatureState;
