export type WhitelabelConfig = {
  slug: string;
  name: string;
  domain: string;
  type: 'solo';
  zignalySuccessFee: number;
  settingFee: number;
  monthlyFee: number;
  externalServiceCommission: number;
  image: string;
  title: string;
  description: string;
  logo: string;
  emailLogo: string;
  favicon: string;
  social: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  supportUrl: string;
  supportHelpCenter: string;
  tools: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  languages: [string];
  emailOrigin: string;
  replyTo: string;
  theme: string;
  // settings: {};
  minInvestment: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
  mainAppLink: string;
  tos: string;
  privacyPolicy: string;
  subscriptionPurchaseLink: string;
  marketplaceMinScore: number;
  kycProvider: 'binance';
};
