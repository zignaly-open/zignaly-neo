export type UserType = {
  id: number;
  nonce: number;
  publicAddress: string;
  username: string;
  email: string;
  discordName: string;
  onBoardingCompleted: Date;
  referralCode: string;
};

export type WalletType = 'metamask' | 'kucoin' | 'walletconnect';
