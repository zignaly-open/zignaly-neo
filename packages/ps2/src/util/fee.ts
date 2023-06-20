// fee.ts
// feet.s
// https://imgur.com/p6iMcpA

import { ZIGNALY_PROFIT_FEE } from './constants';

export function getServiceTotalFee(ownerFee: number) {
  return ownerFee + getServiceZignalyFee(ownerFee);
}

export function getServiceZignalyFee(ownerFee: number) {
  return ownerFee > 0 ? ZIGNALY_PROFIT_FEE : 0;
}

export function getServiceOwnerFee(totalFee: number) {
  return !totalFee
    ? 0
    : Math.max(0, Math.min(75, +totalFee) - ZIGNALY_PROFIT_FEE);
}
