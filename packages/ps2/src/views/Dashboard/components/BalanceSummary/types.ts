export interface BalanceSummaryProps {
  id?: string;
  totalValue?: string;
  profit: string;
  coin: string;
  onClickEdit?: () => void;
  dashboardType?: 'user' | 'investor' | 'marketplace';
}
