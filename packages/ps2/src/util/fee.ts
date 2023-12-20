// fee.ts
// feet.s
// https://imgur.com/p6iMcpA

export function getServiceTotalFee(
  ownerFee: number,
  zglyFee: number,
  isSelf?: boolean,
) {
  return isSelf ? 0 : ownerFee + getServiceZignalyFee(ownerFee, zglyFee);
}

export function getServiceZignalyFee(ownerFee: number, zglyFee: number) {
  return ownerFee > 0 ? zglyFee : 0;
}

export function getServiceOwnerFee(totalFee: number, zglyFee: number) {
  return !totalFee ? 0 : Math.max(0, Math.min(75, +totalFee) - zglyFee);
}

// adjustment for the way the backend handles the full discount
export const adjustDiscountFromBackend = (
  backendValue: number,
  serviceTotalFee: number,
  zglyFee: number,
) =>
  backendValue >= serviceTotalFee - zglyFee ? serviceTotalFee : backendValue;

export const adjustDiscountToBackend = (
  uiValue: number,
  serviceTotalFee: number,
  zglyFee: number,
) => uiValue - (uiValue === serviceTotalFee ? zglyFee : 0);
