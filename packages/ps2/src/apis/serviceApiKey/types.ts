export enum ServiceApiKeyPermission {
  canTrade = 'canTrade',
  marginTrade = 'marginTrade',
  futuresTrade = 'futuresTrade',
  read = 'read',
}

export type ServiceApiKey = {
  alias: string;
  id: string;
  key: string;
  secret?: string;
  ips: string[];
  permissions: ServiceApiKeyPermission[];
};
