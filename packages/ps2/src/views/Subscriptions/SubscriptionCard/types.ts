export type SubscriptionCardProps = {
  name: string;
  price: number;
  successFeePct: number;
  subscriptionFinishesAt?: string;
  status: 'blocked' | 'active' | 'accessible';
  durationTab?: 'lifetime' | 'year';
  subscriptionDuration?: 'lifetime' | 'year';
};
