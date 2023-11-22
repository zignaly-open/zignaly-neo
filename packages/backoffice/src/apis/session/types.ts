export interface UserState {
  accessToken?: string;
}

export type LoginResponse = {
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
