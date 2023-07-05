import { ServiceCommission, TierLevel } from 'apis/referrals/types';

export const MAX_FEES_AMOUNT = 100000;

export const maxCommission = () => {};

export const getBoostedCommissionPct = (
  baseCommission: number,
  traderCommission: number,
  boost: number,
) => {
  return baseCommission * boost + traderCommission;
};

export const getMaxEarnings = (
  baseCommission: number,
  boost: number,
  serviceCommission: ServiceCommission,
) => {
  const boostedCommission = getBoostedCommissionPct(
    baseCommission,
    serviceCommission.commission,
    boost,
  );
  console.log(
    serviceCommission.zignaly,
    baseCommission,
    serviceCommission,
    boost,
    boostedCommission,
    (MAX_FEES_AMOUNT * serviceCommission.zignaly * boostedCommission) / 100,
  );
  return (
    MAX_FEES_AMOUNT *
    (((serviceCommission.zignaly / 100) * boostedCommission) / 100)
  );
};
