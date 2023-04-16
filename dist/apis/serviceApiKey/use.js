import { useParams } from 'react-router-dom';
import { useLazyServiceApiKeysQuery } from './api';
import { ErrorCodes } from '../../util/errors';
export var useRefetchIfDesynchronizedState = function (serviceId) {
    var serviceIdFromParams = useParams().serviceId;
    var reloadKeys = useLazyServiceApiKeysQuery()[0];
    return function (backendResponse) {
        var _a, _b, _c;
        if ([
            ErrorCodes.ServiceApiKeyDeletedByExchange,
            ErrorCodes.ServiceApiKeyNotFound,
        ].includes((_c = (_b = (_a = backendResponse === null || backendResponse === void 0 ? void 0 : backendResponse.error) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.code)) {
            reloadKeys({ serviceId: serviceId || serviceIdFromParams });
        }
    };
};
//# sourceMappingURL=use.js.map