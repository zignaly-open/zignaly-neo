// eslint-disable-next-line @typescript-eslint/ban-types
export type UsersState = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserData = {
  '2faEnabled': boolean;
  accessLevel: number;
  email: string;
  userId: string;
  kycLevels: Record<
    string,
    'rejected' | 'pending' | 'approved' | 'init'
  > | null;
  subscriptionCode: string | null;
  subscriptionLevel: string | null;
};

export type UserFilterType = {
  id?: string;
  email?: string;
  access?: string;
  subscriptionCode?: string;
};

export type UserActionPayloadType = {
  userId: string;
};

// yes copypaste from ps2, sorry
export enum UserAccessLevel {
  Banned = -100,
  NotVerified = 100,
  KycPending = 350,
  NoSubscription = 375,
  Frozen = 400,
  KycExpired = 450,
  SubscriptionExpired = 475,
  Normal = 500,
  Support = 700,
  Admin = 900,
}
