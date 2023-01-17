// because checkboxes.
export type BooleanString = 'true' | 'false';

export type EditApiKeyFormType = {
  alias: string;
  enableIpRestriction: BooleanString; // kek
  ipRestrictions: string;
  canTrade: boolean;
  marginTrade: boolean;
  futuresTrade: boolean;
};

export type CreateApiKeyFormType = {
  alias: string;
};
