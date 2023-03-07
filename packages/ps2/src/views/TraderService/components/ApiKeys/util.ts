import {
  ServiceApiKeyPayload,
  ServiceApiKeyPermission,
} from '../../../../apis/serviceApiKey/types';
import { EditApiKeyFormType } from './types';
import { ipStringToArray } from './validations';

export function addReadIfMissing(
  permissions: ServiceApiKeyPermission[],
): ServiceApiKeyPermission[] {
  if (permissions.includes(ServiceApiKeyPermission.read)) return permissions;
  else return [ServiceApiKeyPermission.read, ...permissions];
}

export function formTypeToBackendPayloadType({
  enableIpRestriction,
  alias,
  ipRestrictions,
  futuresTrade,
  canTrade,
  marginTrade,
}: EditApiKeyFormType): ServiceApiKeyPayload {
  return {
    alias,
    ips:
      // yes, passing arrays as comma-separated values is bad, glad you notices
      enableIpRestriction === 'true'
        ? ipStringToArray(ipRestrictions).join(',')
        : '',
    permissions: [
      futuresTrade && ServiceApiKeyPermission.futuresTrade,
      canTrade && ServiceApiKeyPermission.canTrade,
      marginTrade && ServiceApiKeyPermission.marginTrade,
    ]
      .filter(Boolean)
      .join(','),
  };
}
