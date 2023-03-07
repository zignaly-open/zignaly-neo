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

export type ServiceApiKeyPayload = {
  alias: string;
  ips: string;
  permissions: string;
  code?: string;
};

export type ServiceApiKeyDeletePayload = {
  serviceId: string;
  keyId: string;
  code?: string;
};
