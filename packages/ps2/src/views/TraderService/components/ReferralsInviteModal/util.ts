import { ZIGNALY_PROFIT_FEE } from 'util/constants';

export const MAX_FEES_AMOUNT = 100000;

export const getBoostedCommissionPct = (
  baseCommission: number,
  boost: number,
  traderCommission = 0,
  zignalyCommission = ZIGNALY_PROFIT_FEE,
) => {
  const traderBoost = traderCommission / zignalyCommission;
  const boostedCommission = baseCommission * boost;
  return boostedCommission + boostedCommission * traderBoost;
};

export const getMaxEarnings = (
  baseCommission: number,
  boost: number,
  serviceCommission: number,
  zignalyCommission: number,
) => {
  const boostedCommission = getBoostedCommissionPct(
    baseCommission,
    boost,
    serviceCommission,
    zignalyCommission,
  );
  return (
    MAX_FEES_AMOUNT * (((zignalyCommission / 100) * boostedCommission) / 100)
  );
};
