import { Features } from './type';

const defaultFeatureState: Record<Features, boolean> = {
  [Features.AccessLevels]: true,
  [Features.Rewards]: true,
  [Features.Referrals]: true,
  [Features.Trader]: true,
  [Features.NoPublicMarketplace]: false,
  [Features.HideSignup]: false,
  [Features.NewSignup]: true,
  [Features.Subscriptions]: false,
  [Features.Kyc]: false,
  [Features.ZScore]: true,
};

export default defaultFeatureState;
