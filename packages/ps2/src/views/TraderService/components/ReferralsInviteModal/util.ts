import { ZIGNALY_PROFIT_FEE } from 'util/constants';

export const MAX_FEES_AMOUNT = 100000;

export const getTraderBoost = (
  serviceCommission: number,
  zignalyCommission: number,
) => {
  return (
    serviceCommission / ZIGNALY_PROFIT_FEE +
    (zignalyCommission - ZIGNALY_PROFIT_FEE) / ZIGNALY_PROFIT_FEE
  );
};

export const getServiceCommission = (
  serviceCommission: number,
  zignalyCommission: number,
) => {
  return (
    ZIGNALY_PROFIT_FEE * getTraderBoost(serviceCommission, zignalyCommission)
  );
};

export const getBoostedCommissionPct = (
  baseCommission: number,
  boost: number,
  traderBoost = 0,
) => {
  const boostedCommission = baseCommission * boost;
  return boostedCommission + boostedCommission * traderBoost || 0;
};

export const getMaxEarnings = (
  baseCommission: number,
  boost: number,
  traderBoost: number,
) => {
  const boostedCommission = getBoostedCommissionPct(
    baseCommission,
    boost,
    traderBoost,
  );
  return (
    MAX_FEES_AMOUNT *
      (((ZIGNALY_PROFIT_FEE / 100) * boostedCommission) / 100) || 0
  );
};
