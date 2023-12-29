import { Features } from './type';

const defaultFeatureState: Record<Features, boolean> = {
  [Features.AccessLevels]: true,
  [Features.Rewards]: true,
  [Features.Referrals]: true,
  [Features.CreateService]: true,
  [Features.NoPublicMarketplace]: false,
  [Features.HideSignup]: false,
  [Features.NewSignup]: true,
  [Features.Subscriptions]: false,
  [Features.Kyc]: false,
};

export default defaultFeatureState;
