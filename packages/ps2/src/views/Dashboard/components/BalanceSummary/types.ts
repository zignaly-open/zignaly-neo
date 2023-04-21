export interface BalanceSummaryProps {
  prefixId?: string;
  serviceId?: string;
  totalValue?: string;
  profit: string;
  coin: string;
  onClickEdit?: () => void;
  dashboardType?: 'user' | 'investor' | 'marketplace';
}
