export type ServiceManagementsBalances = {
  sbt: string;
  debt: string;
  staSscFree: string;
  staSscSum: string;
  scaSscSum: string;
  dfa: string;
};

export type ServiceManagementsContainerProps = {
  serviceId?: string;
  service?: any;
  balances: ServiceManagementsBalances;
  management?: any;
  isLoading?: boolean;
};
