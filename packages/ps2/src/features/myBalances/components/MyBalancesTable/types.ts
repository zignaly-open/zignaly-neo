export interface Data {
  coin: {
    symbol: string;
    name: string;
  };
  total: {
    symbol: string;
    balanceTotal: string;
  };
  available: {
    symbol: string;
    balanceFree: string;
  };
  locked: {
    symbol: string;
    balanceLocked: string;
  };
  valueBTC: {
    symbol: string;
    balanceTotalBTC: string;
  };
  valueUSD: {
    symbol: string;
    balanceTotalUSDT: string;
  };
}
