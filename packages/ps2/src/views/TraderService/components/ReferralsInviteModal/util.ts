import { whitelabel } from '../../../../whitelabel';

export const MAX_FEES_AMOUNT = 100000;

export const getTraderBoost = (
  serviceCommission: number,
  zignalyCommission = whitelabel.zignalySuccessFee,
) => {
  if (zignalyCommission < whitelabel.defaultSuccessFee) return 0;
  return (
    serviceCommission / whitelabel.zignalySuccessFee +
    (zignalyCommission - whitelabel.zignalySuccessFee) /
      whitelabel.zignalySuccessFee
  );
};

export const getServiceCommission = (
  serviceCommission: number,
  zignalyCommission: number,
) => {
  return (
    whitelabel.zignalySuccessFee *
    getTraderBoost(serviceCommission, zignalyCommission)
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
      (((whitelabel.zignalySuccessFee / 100) * boostedCommission) / 100) || 0
  );
};
