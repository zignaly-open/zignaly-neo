var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { useEffect, useRef, useState } from 'react';
import { SessionsTypes, } from './types';
import { useActivateExchangeMutation, useLazySessionQuery, useLazyUserQuery, useLoginMutation, useLogoutMutation, useResendCodeMutation, useResendCodeNewUserMutation, useResendKnownDeviceCodeMutation, useSessionQuery, useSetLocaleMutation, useSignupMutation, useVerify2FAMutation, useVerifyCodeMutation, useVerifyCodeNewUserMutation, useVerifyKnownDeviceMutation, } from './api';
import { activateExchange, logout, setAccessToken, setActiveExchangeInternalId, setSessionExpiryDate, setUser, } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackConversion, trackEndSession, trackNewSession, } from '../../util/analytics';
import { endLiveSession, startLiveSession } from '../../util/liveSession';
import { useTranslation } from 'react-i18next';
import { useModal } from 'mui-modal-provider';
import AuthVerifyModal from '../../views/Auth/components/AuthVerifyModal';
import { getImageOfAccount } from '../../util/images';
import { useLazyTraderServicesQuery } from '../service/api';
import { useZModal } from 'components/ZModal/use';
import Check2FAModal from 'views/Auth/components/Check2FAModal';
import { useNavigate } from 'react-router-dom';
import { track } from '@zignaly-open/tracker';
var useStartSession = function () {
    var showModal = useModal().showModal;
    var dispatch = useDispatch();
    var loadSession = useLazySessionQuery()[0];
    var loadTraderServices = useLazyTraderServicesQuery()[0];
    var loadUser = useLazyUserQuery()[0];
    return function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var needsModal, modal_1, _a, userData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dispatch(setAccessToken(user.token));
                    user.userId && track({ userId: user.userId });
                    needsModal = user.ask2FA ||
                        user.isUnknownDevice ||
                        user.disabled ||
                        user.emailUnconfirmed;
                    if (!needsModal) return [3, 2];
                    return [4, new Promise(function (resolve, reject) {
                            modal_1 = showModal(AuthVerifyModal, {
                                user: user,
                                onSuccess: resolve,
                                onFailure: reject,
                                close: function () { return modal_1.destroy(); },
                            });
                        })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: return [4, Promise.all([
                        loadSession()
                            .unwrap()
                            .then(function (_a) {
                            var validUntil = _a.validUntil;
                            return dispatch(setSessionExpiryDate(validUntil));
                        }),
                        loadUser().unwrap(),
                        loadTraderServices().unwrap(),
                    ])];
                case 3:
                    _a = _b.sent(), userData = _a[1];
                    dispatch(setUser(userData));
                    startLiveSession(userData);
                    trackNewSession(userData, SessionsTypes.Login);
                    localStorage.setItem('hasLoggedIn', 'true');
                    return [2];
            }
        });
    }); };
};
export var useSignup = function () {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var signup = useSignupMutation()[0];
    var startSession = useStartSession();
    return [
        { loading: loading },
        function (payload) { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 5]);
                        return [4, signup(payload).unwrap()];
                    case 2:
                        user = _a.sent();
                        return [4, startSession(__assign(__assign({}, user), { emailUnconfirmed: true }))];
                    case 3:
                        _a.sent();
                        trackConversion();
                        return [3, 5];
                    case 4:
                        setLoading(false);
                        return [7];
                    case 5: return [2];
                }
            });
        }); },
    ];
};
export var useAuthenticate = function () {
    var login = useLoginMutation()[0];
    var startSession = useStartSession();
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    return [
        { loading: loading },
        function (payload) { return __awaiter(void 0, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, login(__assign({}, payload)).unwrap()];
                    case 2:
                        user = _a.sent();
                        return [4, startSession(user)];
                    case 3:
                        _a.sent();
                        setLoading(false);
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        setLoading(false);
                        throw e_1;
                    case 5: return [2];
                }
            });
        }); },
    ];
};
export function useLogout(performRequest) {
    if (performRequest === void 0) { performRequest = true; }
    var dispatch = useDispatch();
    var logoutRequest = useLogoutMutation()[0];
    var navigate = useNavigate();
    return function () {
        if (performRequest) {
            logoutRequest();
        }
        dispatch(logout());
        navigate('/login');
        endLiveSession();
        trackEndSession();
    };
}
export function useIsAuthenticated() {
    var _a;
    var user = (_a = useSelector(function (state) { return state.user; })) === null || _a === void 0 ? void 0 : _a.user;
    return !!user;
}
export function useCurrentUser() {
    var _a;
    return (((_a = useSelector(function (state) { return state.user; })) === null || _a === void 0 ? void 0 : _a.user) || {});
}
export var useVerify2FA = useVerify2FAMutation;
export var useVerifyEmailNewUser = useVerifyCodeNewUserMutation;
export var useVerifyEmail = useVerifyCodeMutation;
export var useVerifyEmailKnownDevice = useVerifyKnownDeviceMutation;
export var useResendCode = useResendCodeMutation;
export var useResendCodeNewUser = useResendCodeNewUserMutation;
export var useResendKnownDeviceCode = useResendKnownDeviceCodeMutation;
export function useChangeLocale() {
    var save = useSetLocaleMutation()[0];
    var i18n = useTranslation().i18n;
    var isAuthenticated = useIsAuthenticated();
    var userData = useCurrentUser();
    var _a = useState(null), newLocale = _a[0], setNewLocale = _a[1];
    useEffect(function () {
        if (!isAuthenticated)
            return;
        if (newLocale && (userData === null || userData === void 0 ? void 0 : userData.locale) !== newLocale) {
            save({ locale: newLocale });
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.locale) !== i18n.language) {
            i18n.changeLanguage(userData.locale);
        }
    }, [userData === null || userData === void 0 ? void 0 : userData.locale]);
    return function (locale) {
        i18n.changeLanguage(locale);
        if (isAuthenticated) {
            save({ locale: locale });
        }
        else {
            setNewLocale(locale);
        }
    };
}
export var useGetExchangeByInternalId = function () {
    var _a = useSelector(function (state) { return state.user; }), user = _a.user, activeExchangeInternalId = _a.activeExchangeInternalId;
    return function (internalId) {
        var _a;
        if (!(user === null || user === void 0 ? void 0 : user.exchanges))
            return undefined;
        var id = internalId || activeExchangeInternalId;
        var exchange = id && ((_a = user.exchanges) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.internalId === id; }));
        if (!exchange)
            return undefined;
        return __assign(__assign({}, exchange), { image: getImageOfAccount(user.exchanges.indexOf(exchange)) });
    };
};
export function useActiveExchange() {
    var _a, _b;
    var _c = useSelector(function (state) { return state.user; }), user = _c.user, internalId = _c.activeExchangeInternalId;
    var dispatch = useDispatch();
    var defaultExchange = (_a = user === null || user === void 0 ? void 0 : user.exchanges) === null || _a === void 0 ? void 0 : _a[0];
    var exchange = (_b = user === null || user === void 0 ? void 0 : user.exchanges) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.internalId === internalId; });
    useEffect(function () {
        if (!exchange && defaultExchange) {
            dispatch(setActiveExchangeInternalId(defaultExchange.internalId));
        }
    }, [exchange]);
    var result = exchange || defaultExchange || undefined;
    return (result && __assign(__assign({}, result), { image: getImageOfAccount(user.exchanges.indexOf(result)) }));
}
export function useSelectExchange() {
    var dispatch = useDispatch();
    return function (exchangeInternalId) {
        return dispatch(setActiveExchangeInternalId(exchangeInternalId));
    };
}
export function useActivateExchange(exchangeInternalId) {
    var exchange = useActiveExchange();
    var _a = useActivateExchangeMutation(), activate = _a[0], result = _a[1];
    var dispatch = useDispatch();
    var internalId = exchangeInternalId || (exchange === null || exchange === void 0 ? void 0 : exchange.internalId);
    useEffect(function () {
        if (exchangeInternalId || (exchange && !exchange.activated)) {
            activate({
                exchangeInternalId: internalId,
            }).then(function () {
                dispatch(activateExchange(internalId));
            });
        }
    }, [internalId]);
    return result;
}
export function useMaybeMakeSureSessionIsAlive(makeSure) {
    useSessionQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !makeSure,
    });
}
export function useCheck2FA(_a) {
    var status = _a.status;
    var _b = useZModal(), showModal = _b.showModal, updateModal = _b.updateModal;
    var modalId = useRef(null);
    var ask2FA = useCurrentUser().ask2FA;
    useEffect(function () {
        if (modalId.current) {
            updateModal(modalId.current, {
                status: status,
            });
        }
    }, [status]);
    if (!ask2FA) {
        return function (action) { return action(); };
    }
    return function (action) {
        var modal = showModal(Check2FAModal, {
            status: status,
            action: action,
            TransitionProps: {
                onClose: function () {
                    modalId.current = null;
                },
            },
        });
        modalId.current = modal.id;
    };
}
//# sourceMappingURL=use.js.map