type TraderServiceStatus = 'FULL' | string;

export type ServiceState = {
  traderServices?: TraderService[];
  activeServiceId?: string;
};

export type TraderService = {
  operative: TraderServiceStatus;
  serviceId: string;
  serviceName: string;
};

export enum TraderServiceAccessLevel {
  Solo = 0,
  Private = 100,
  Public = 200,
}

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

export type InternalAccountType = 'STA' | 'SCA';

export type TransferPayload = {
  from: InternalAccountType;
  to: InternalAccountType;
  amount: string;
};

export type Service = {
  createdAt: string;
  description: string;
  exchangeInternalId: string;
  fundsAllocated: string;
  id: string;
  liquidated: boolean;
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
  tags: string[];
  type: string;
  usdtInvested: string;
  userId: string;

  pnlPercent7t: string;
  pnlPercent30t: string;
  pnlPercent90t: string;
  pnlPercent180t: string;
  pnlPercent365t: string;

  pnlSsc7t: string;
  pnlSsc30t: string;
  pnlSsc90t: string;
  pnlSsc180t: string;
  pnlSsc365t: string;
};
