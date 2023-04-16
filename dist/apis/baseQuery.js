var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { fetchBaseQuery, } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import { logout, setSessionExpiryDate } from './user/store';
import { TIME_TO_START_REFRESHING_TOKEN } from '../util/constants';
import i18next from '../util/i18next';
import { backendError } from 'util/hooks/useToast';
var mutex = new Mutex();
var baseQuery = function (baseUrl) {
    if (baseUrl === void 0) { baseUrl = process.env.REACT_APP_BASE_API; }
    return fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: function (headers, _a) {
            var getState = _a.getState, endpoint = _a.endpoint;
            var token = getState().user.accessToken;
            if (token && !['login', 'signup'].includes(endpoint)) {
                headers.set('authorization', "Bearer ".concat(token));
            }
            if (!headers || !headers.get('Content-Type')) {
                headers.set('content-type', 'application/json');
            }
            return headers;
        },
    });
};
var endpointsWhitelistedFor401 = [
    'user/verify_code/enable_user',
    'user/verify_code/verify_email',
    "user/verify_2fa",
    "known_device/verify",
    "login",
    "logout",
    'change_password',
];
var maybeReportError = function (error, requestType) {
    if (!error)
        return;
    backendError(i18next.t, error, requestType === 'mutation');
};
var customFetchBase = function (baseUrl) { return function (args, api, extraOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var result, release, refreshResult;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, baseQuery(baseUrl)(args, api, extraOptions)];
            case 1:
                result = _c.sent();
                (extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.silent) || maybeReportError(result === null || result === void 0 ? void 0 : result.error, api === null || api === void 0 ? void 0 : api.type);
                if (!(((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.status) === 401 &&
                    !endpointsWhitelistedFor401.includes(args.url))) return [3, 2];
                api.dispatch(logout());
                return [3, 7];
            case 2:
                if (!(+new Date(api.getState().user.sessionExpiryDate) -
                    TIME_TO_START_REFRESHING_TOKEN <
                    Date.now())) return [3, 7];
                if (!!mutex.isLocked()) return [3, 7];
                return [4, mutex.acquire()];
            case 3:
                release = _c.sent();
                _c.label = 4;
            case 4:
                _c.trys.push([4, , 6, 7]);
                return [4, baseQuery()({ url: 'user/session' }, api, extraOptions)];
            case 5:
                refreshResult = _c.sent();
                api.dispatch(setSessionExpiryDate((_b = refreshResult === null || refreshResult === void 0 ? void 0 : refreshResult.data) === null || _b === void 0 ? void 0 : _b.validUntil));
                return [3, 7];
            case 6:
                release();
                return [7];
            case 7: return [2, result];
        }
    });
}); }; };
export default customFetchBase;
//# sourceMappingURL=baseQuery.js.map