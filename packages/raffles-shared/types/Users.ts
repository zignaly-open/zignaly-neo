export type UserType = {
  id: number;
  nonce: number;
  publicAddress: string;
  username: string;
  email: string;
  discordName: string;
  onBoardingCompleted: Date;
  emailVerificationSent?: boolean;
  zhitRewarded?: boolean;
  isAdmin?: boolean;
  emailVerified?: boolean;
};

export type WalletType = 'metamask' | 'kucoin' | 'walletconnect';
