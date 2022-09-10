type TraderServiceStatus = 'FULL' | string;

export type TraderState = {
  traderServices?: TraderService[];
  activeServiceId?: string;
};

export type TraderService = {
  operative: TraderServiceStatus;
  serviceId: string;
  serviceName: string;
};

export type TraderServiceFull = {
  createdAt: string;
  description: string;
  exchangeInternalId: string;
  fundsAllocated: string;
  id: string;
  invested: string;
  investors: number;
  level: number;
  logo: string;
  name: string;
  ownerCountry: string;
  ownerCreatedAt: string;
  ownerDescription: string;
  ownerName: string;
  ownerVerified: boolean;
  solo: boolean;
  ssc: string;
  successFee: string;
  type: string;
  usdtInvested: string;
  userId: string;
};

export type TraderServiceManagement = {
  createdAt: string;
  dfa: string;
  dfaMqDebt: string;
  invested: string;
  investors: number;
  level: number;
  maximumSbt: string;
  minimumSca: string;
  name: string;
  ownerId: string;
  ownerSfInZig: false;
  ownerZigDisc: string;
  pending: string;
  serviceId: string;
  storedZglySuccessFee: string;
  successFee: string;
  transferOut: string;
  zglySuccessFee: string;
  zglyZigDisc: string;
};

export type TraderServiceBalance = {
  sbt: string;
  staSscFree: string;
  staSscSum: string;
  scaSscSum: string;
  dfa: string;
  debt: string;
};

export type Investor = {
  accountType: string;
  email: string;
  invested: string;
  payZig: boolean;
  pending: string;
  pnlNetAt: string;
  pnlNetLc: string;
  pnlPctLc: string;
  sfOwnerAt: string;
  sfOwnerLc: string;
  userId: string;
};
