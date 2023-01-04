import { ServiceApiKeyPermission } from '../../../../apis/serviceApiKey/types';

export function addReadIfMissing(
  permissions: ServiceApiKeyPermission[],
): ServiceApiKeyPermission[] {
  if (permissions.includes(ServiceApiKeyPermission.read)) return permissions;
  else return [ServiceApiKeyPermission.read, ...permissions];
}
