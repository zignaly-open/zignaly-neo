export interface BalanceSummaryProps {
  totalValue?: string;
  profit: string;
  coin: string;
  onClickEdit?: () => void;
  dashboardType?: 'user' | 'investor' | 'marketplace';
}
