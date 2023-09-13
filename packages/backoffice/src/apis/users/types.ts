// eslint-disable-next-line @typescript-eslint/ban-types
export type UsersState = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserData = {
  '2faEnabled': boolean;
  accessLevel: number;
  email: string;
  userId: string;
  kycLevels: string | null;
  subscriptionCode: string | null;
  subscriptionLevel: string | null;
};

export type UserFilterType = {
  userId: string;
  email: string;
  accessLevel: string;
  subscriptionCode: string;
};

export type UserActionPayloadType = {
  userId: string;
};
