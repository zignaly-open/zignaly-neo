// fee.ts
// feet.s
// https://imgur.com/p6iMcpA

import { ZIGNALY_PROFIT_FEE } from './constants';

export function getServiceTotalFee(ownerFee: number, isSelf?: boolean) {
  return isSelf ? 0 : ownerFee + getServiceZignalyFee(ownerFee);
}

export function getServiceZignalyFee(ownerFee: number) {
  return ownerFee > 0 ? ZIGNALY_PROFIT_FEE : 0;
}

export function getServiceOwnerFee(totalFee: number) {
  return !totalFee
    ? 0
    : Math.max(0, Math.min(75, +totalFee) - ZIGNALY_PROFIT_FEE);
}

// adjustment for the way the backend handles the full discount
export const adjustDiscountFromBackend = (
  backendValue: number,
  serviceTotalFee: number,
) =>
  backendValue === serviceTotalFee - ZIGNALY_PROFIT_FEE
    ? serviceTotalFee
    : backendValue;

export const adjustDiscountToBackend = (
  uiValue: number,
  serviceTotalFee: number,
) => uiValue - (uiValue === serviceTotalFee ? ZIGNALY_PROFIT_FEE : 0);
