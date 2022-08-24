export interface BalanceSummaryProps {
  totalValue?: string;
  profit: string;
  fiat?: boolean;
  // FIXME: this is attr bs we should not be passign the coin AND the flag if that coin is stable,
  // we should be taking OnLy the coin and doing all calculations here
  stableCoinOperative?: boolean;
  symbol?: string;
  onClickEdit?: () => void;
  dashboardType?: 'user' | 'investor' | 'marketplace';
}
