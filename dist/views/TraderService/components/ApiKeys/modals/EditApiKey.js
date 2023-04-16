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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../../components/ZModal';
import { ServiceApiKeyPermission, } from '../../../../../apis/serviceApiKey/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { EditKeyValidation } from '../validations';
import { CloneIcon, dark, InputText, ZigButton, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../../../util/hooks/useToast';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, Grid, Radio, RadioGroup, Tooltip, } from '@mui/material';
import { MultilineLabel } from '../atoms';
import { useServiceApiKeyEditMutation } from '../../../../../apis/serviceApiKey/api';
import { formTypeToBackendPayloadType } from '../util';
import { useCheck2FA } from '../../../../../apis/user/use';
import { useRefetchIfDesynchronizedState } from '../../../../../apis/serviceApiKey/use';
function EditApiKeysModal(_a) {
    var _this = this;
    var close = _a.close, apiKey = _a.apiKey, serviceId = _a.serviceId, props = __rest(_a, ["close", "apiKey", "serviceId"]);
    var t = useTranslation(['management']).t;
    var toast = useToast();
    var _b = useServiceApiKeyEditMutation(), updateApiKey = _b[0], status = _b[1];
    var refetchIfDesyncronized = useRefetchIfDesynchronizedState(serviceId);
    var isLoading = status.isLoading;
    var edit2FA = useCheck2FA({
        status: status,
    });
    var defaultValues = useMemo(function () {
        var _a, _b;
        return ({
            alias: apiKey.alias,
            enableIpRestriction: JSON.stringify(apiKey.ips.some(Boolean)),
            ipRestrictions: apiKey.ips.join(', '),
            canTrade: (_a = apiKey.permissions) === null || _a === void 0 ? void 0 : _a.includes(ServiceApiKeyPermission.canTrade),
            futuresTrade: (_b = apiKey.permissions) === null || _b === void 0 ? void 0 : _b.includes(ServiceApiKeyPermission.futuresTrade),
        });
    }, []);
    var _c = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        resolver: yupResolver(EditKeyValidation),
        defaultValues: defaultValues,
    }), handleSubmit = _c.handleSubmit, control = _c.control, watch = _c.watch, register = _c.register, errors = _c.formState.errors;
    var showIpRestrictions = watch('enableIpRestriction') === 'true';
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            edit2FA(function (code) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, updateApiKey({
                                serviceId: serviceId,
                                keyId: apiKey.id,
                                data: __assign(__assign({}, formTypeToBackendPayloadType(data)), { code: code }),
                            })];
                        case 1:
                            result = _a.sent();
                            if (!('error' in result)) {
                                toast.success(t('common:changes-saved'));
                                close();
                            }
                            else {
                                refetchIfDesyncronized(result);
                            }
                            return [2];
                    }
                });
            }); });
            return [2];
        });
    }); };
    var isCreate = !!apiKey.secret;
    isCreate && register('alias');
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { close: close, title: t(isCreate ? 'api-keys.create-new-key' : 'api-keys.edit-key') }),
        isCreate && (React.createElement(ZigTypography, { sx: { mb: 3 } }, t('api-keys.create-new-key-description'))),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            !isCreate && (React.createElement(Controller, { name: 'alias', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ sx: {
                            mb: 4,
                        }, wide: true, label: t('common:name') + ':', placeholder: t('common:name'), disabled: isLoading, error: t((_b = errors.alias) === null || _b === void 0 ? void 0 : _b.message, { maxLength: 30 }) }, field)));
                } })),
            React.createElement(Box, { sx: { mb: 4 } },
                React.createElement(InputText, { placeholder: t('api-keys.api-key'), label: t('api-keys.api-key'), readOnly: true, value: apiKey.key, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                        copy(apiKey.key);
                        toast.success(t('action:copied'));
                    } })),
            React.createElement(Box, { sx: { mb: 4 } }, isCreate ? (React.createElement(InputText, { placeholder: t('api-keys.api-secret'), label: React.createElement(MultilineLabel, { title: t('api-keys.api-secret'), subtitle: t('api-keys.api-secret-explainer') }), readOnly: true, value: apiKey.secret, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                    copy(apiKey.secret);
                    toast.success(t('action:copied'));
                } })) : (React.createElement(React.Fragment, null,
                React.createElement(MultilineLabel, { title: t('api-keys.api-secret'), subtitle: t('api-keys.api-secret-explainer') }),
                React.createElement(Tooltip, { title: t('api-keys.api-settings-tooltip') },
                    React.createElement(ZigTypography, null, "********"))))),
            React.createElement(Box, { sx: { mb: 4 } },
                React.createElement(InputText, { placeholder: t('api-keys.zignaly-code'), label: t('api-keys.zignaly-code'), readOnly: true, value: apiKey.id, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                        copy(apiKey.id);
                        toast.success(t('action:copied'));
                    } })),
            React.createElement(Box, { sx: { mb: 4 } },
                React.createElement(ZigTypography, null, t('api-keys.api-settings')),
                React.createElement(Grid, { container: true },
                    React.createElement(Grid, { item: true, xs: 12, md: 6 },
                        React.createElement(Tooltip, { title: t('api-keys.cant-disable-read') },
                            React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { disabled: isLoading, checked: true, onChange: function () { } }), label: t('api-keys.permissions-enable.read') }))),
                    React.createElement(Grid, { item: true, xs: 12, md: 6 },
                        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, __assign({}, register('canTrade'), { checked: watch('canTrade'), disabled: isLoading })), label: t('api-keys.permissions-enable.canTrade') })),
                    React.createElement(Grid, { item: true, xs: 12, md: 6 },
                        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, __assign({}, register('futuresTrade'), { checked: watch('futuresTrade'), disabled: isLoading })), label: t('api-keys.permissions-enable.futuresTrade') })))),
            React.createElement(Box, { sx: { mb: showIpRestrictions ? 1 : 4 } },
                React.createElement(ZigTypography, null, t('api-keys.restrict-ip')),
                React.createElement(RadioGroup, { name: 'enableIpRestriction', defaultValue: defaultValues.enableIpRestriction },
                    React.createElement(FormControlLabel, { control: React.createElement(Radio, __assign({ disabled: isLoading }, register('enableIpRestriction'))), value: 'false', label: t('api-keys.ip-restrictions-none') }),
                    React.createElement(FormControlLabel, { control: React.createElement(Radio, __assign({ disabled: isLoading }, register('enableIpRestriction'))), value: 'true', label: t('api-keys.ip-restrictions-on') }))),
            showIpRestrictions && (React.createElement(Box, null,
                React.createElement(Controller, { name: 'ipRestrictions', control: control, rules: { required: true }, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ disabled: isLoading, sx: {
                                mt: 2,
                                mb: 4,
                            }, multiline: true, rows: 2, wide: true, label: React.createElement(MultilineLabel, { title: t('api-keys.ip-restrictions-allowed'), subtitle: t('api-keys.ip-restrictions-allowed-explainer') }), error: t((_b = errors.ipRestrictions) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                    } }))),
            React.createElement(Box, { sx: { textAlign: 'center', mt: 4 } },
                React.createElement(ZigButton, { id: 'api-key__save-and-close', variant: 'contained', loading: isLoading, type: 'submit', size: 'large' }, t('action:save-and-close'))))));
}
EditApiKeysModal.trackId = 'api-key-edit';
export default EditApiKeysModal;
//# sourceMappingURL=EditApiKey.js.map