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
  id: string;
  email: string;
  access: string;
  subscriptionCode: string;
};

export type UserActionPayloadType = {
  userId: string;
};
