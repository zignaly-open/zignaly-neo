var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ServiceApiKeyPermission, } from '../../../../apis/serviceApiKey/types';
import { ipStringToArray } from './validations';
export function addReadIfMissing(permissions) {
    if (permissions.includes(ServiceApiKeyPermission.read))
        return permissions;
    else
        return __spreadArray([ServiceApiKeyPermission.read], permissions, true);
}
export function formTypeToBackendPayloadType(_a) {
    var enableIpRestriction = _a.enableIpRestriction, alias = _a.alias, ipRestrictions = _a.ipRestrictions, futuresTrade = _a.futuresTrade, canTrade = _a.canTrade, marginTrade = _a.marginTrade;
    return {
        alias: alias,
        ips: enableIpRestriction === 'true'
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
//# sourceMappingURL=util.js.map