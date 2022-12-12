export type TransferHistoryTableDataType = {
  date: string;
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
    balanceTotalBTC: string;
  };
  valueUSD: {
    balanceTotalUSDT: string;
  };
};
