import { AxisFormat } from '@zignaly-open/ui/lib/components/display/ZigChart/types';
import { ExchangeType } from '../user/types';

type TraderServiceStatus = 'FULL' | string;

export type ServiceState = {
  traderServices?: TraderService[];
  activeServiceId?: string;
  chartType: GraphChartType;
  chartTimeframe: GraphTimeframe;
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
  Marketplace = 500,
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
  pending: number;
  solo: boolean;
  ssc: string;
  successFee: string;
  type: string;
  investedUSDT: string;
  userId: string;
  maximumSbt: number;
};

export type ServiceTypesInfo = Record<
  ExchangeType,
  Record<string, { minimum_owner_balance: number }>
>;

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
  pending: number;
  solo: boolean;
  ssc: string;
  successFee: number;
  tags: string[];
  type: string;
  investedUSDT: string;
  userId: string;
  maximumSbt: number;

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

export type TraderServiceChart = {
  [x: string]: unknown;
  data: Record<string, number>;
  summary: string;
  migration_date: string;
  summaryPct: string;
};

export type TraderServiceChartProcessed = {
  data: AxisFormat[];
  summary: string | number;
  percentDiff?: number | string;
  migrationDate?: string;
  migrationIndex?: number;
};

export enum GraphTimeframe {
  '7d' = '7d',
  '30d' = '30d',
  '90d' = '90d',
  '180d' = '180d',
  '365d' = '365d',
  // 'all' = 'all', // looks like it is not supported by the backend
}

export const GraphTimeframeDayLength = {
  [GraphTimeframe['7d']]: 7,
  [GraphTimeframe['30d']]: 30,
  [GraphTimeframe['90d']]: 90,
  [GraphTimeframe['180d']]: 180,
  [GraphTimeframe['365d']]: 365,
};

export enum GraphChartType {
  'investors' = 'investors',
  'sbt_ssc' = 'sbt_ssc',
  'pnl_ssc' = 'pnl_ssc',
  'at_risk_pct' = 'at_risk_pct',
  'pnl_pct_compound' = 'pnl_pct_compound',
}

export type EditServicePayload = {
  id: string;
  name: string;
  description: string;
  successFee: number;
  maximumSbt: number;
  logo: string;
  level: TraderServiceAccessLevel;
};

export type CreateServicePayload = {
  amount: number;
  name: string;
  ssc: string;
  type: string;
  exchangeInternalId: string;
  successFee: number;
};
