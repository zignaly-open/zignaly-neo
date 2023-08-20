export type SubscriptionCardProps = {
  name: string;
  price: number;
  successFeePct: number;
  subscriptionFinishesAt?: string;
  status: 'blocked' | 'active' | 'accessible';
};
