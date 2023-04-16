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
import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../../components/ZModal';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateKeyValidation } from '../validations';
import { useServiceApiKeyCreateMutation } from '../../../../../apis/serviceApiKey/api';
import { useCheck2FA } from '../../../../../apis/user/use';
function CreateApiKeysModal(_a) {
    var _this = this;
    var close = _a.close, serviceId = _a.serviceId, afterSave = _a.afterSave, props = __rest(_a, ["close", "serviceId", "afterSave"]);
    var t = useTranslation(['management']).t;
    var _b = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        resolver: yupResolver(CreateKeyValidation),
        defaultValues: {
            alias: '',
        },
    }), handleSubmit = _b.handleSubmit, control = _b.control, errors = _b.formState.errors;
    var _c = useServiceApiKeyCreateMutation(), create = _c[0], status = _c[1];
    var isCreating = status.isLoading;
    var create2FA = useCheck2FA({
        status: status,
    });
    var onSubmit = function (_a) {
        var alias = _a.alias;
        create2FA(function (code) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, create({ alias: alias, serviceId: serviceId, code: code })];
                    case 1:
                        result = _a.sent();
                        if (!('error' in result)) {
                            afterSave(result.data);
                            close();
                        }
                        return [2];
                }
            });
        }); });
    };
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { close: close, title: t('api-keys.create-new-key') }),
        React.createElement(ZigTypography, null, t('api-keys.create-new-key-description')),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            React.createElement(Controller, { name: 'alias', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ sx: {
                            mt: 2,
                            mb: 4,
                        }, wide: true, label: t('common:name') + ':', placeholder: t('common:name') + ':', disabled: isCreating, error: t((_b = errors.alias) === null || _b === void 0 ? void 0 : _b.message, { maxLength: 30 }) }, field)));
                } }),
            React.createElement(Box, { sx: { textAlign: 'center' } },
                React.createElement(ZigButton, { id: 'api-key__create-key', disabled: isCreating, variant: 'contained', type: 'submit', size: 'large' }, t('api-keys.create-key'))))));
}
CreateApiKeysModal.trackId = 'api-key-create';
export default CreateApiKeysModal;
//# sourceMappingURL=CreateApiKey.js.map