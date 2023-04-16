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
import React from 'react';
import { CloneIcon, dark, InputText, ZigButton, ZigTypography, } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PencilIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import { ApiKey, TextWrapperRow } from '../atoms';
import { useParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../../../util/hooks/useToast';
import { addReadIfMissing } from '../util';
import { useZModal, useZTypeWordConfirm, } from '../../../../../components/ZModal/use';
import EditApiKey from '../modals/EditApiKey';
import { useServiceApiKeyDeleteMutation } from '../../../../../apis/serviceApiKey/api';
import { useCheck2FA } from '../../../../../apis/user/use';
import { useRefetchIfDesynchronizedState } from '../../../../../apis/serviceApiKey/use';
var ApiKeyEntry = function (_a) {
    var apiKey = _a.apiKey;
    var _b = useTranslation(['management', 'actions']), t = _b.t, i18n = _b.i18n;
    var serviceId = useParams().serviceId;
    var refetchIfDesyncronized = useRefetchIfDesynchronizedState();
    var showModal = useZModal().showModal;
    var askConfirm = useZTypeWordConfirm();
    var toast = useToast();
    var _c = useServiceApiKeyDeleteMutation(), deleteKey = _c[0], deleteStatus = _c[1];
    var delete2FA = useCheck2FA({
        status: deleteStatus,
    });
    var handleDeleteWrapper = function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, deleteKey(args)];
                case 1:
                    result = _a.sent();
                    'error' in result && refetchIfDesyncronized(result);
                    return [2];
            }
        });
    }); };
    return (React.createElement(ApiKey, null,
        React.createElement(ZigTypography, { variant: 'h3', sx: { mb: 1.5 } }, apiKey.alias),
        React.createElement(Box, { sx: { flexDirection: 'row', display: 'flex', gap: 3 } },
            React.createElement(Box, { sx: { flex: 5, mr: 2 } },
                React.createElement(InputText, { placeholder: t('api-keys.api-key'), label: t('api-keys.api-key'), readOnly: true, value: apiKey.key, rightSideElement: React.createElement(CloneIcon, { width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                        copy(apiKey.key);
                        toast.success(t('action:copied'));
                    } })),
            React.createElement(Box, { sx: { flex: 2 } },
                React.createElement(ZigTypography, { color: 'neutral200' }, t('api-keys.permission-label')),
                React.createElement(TextWrapperRow, null,
                    React.createElement(ZigTypography, { color: 'neutral100' }, addReadIfMissing(apiKey.permissions)
                        .map(function (p) {
                        return i18n.exists("management:api-keys.permissions.".concat(p))
                            ? t("api-keys.permissions.".concat(p))
                            : p;
                    })
                        .join(', ')))),
            React.createElement(Box, { sx: { flex: 2 } },
                React.createElement(ZigTypography, { color: 'neutral200' }, t('api-keys.ip-restrictions')),
                React.createElement(TextWrapperRow, null,
                    React.createElement(ZigTypography, { color: 'neutral100' }, apiKey.ips.join(', ') || t('api-keys.ip-restrictions-none')))),
            React.createElement(Box, { sx: { alignSelf: 'center' } },
                React.createElement(ZigButton, { id: 'trader-api__edit-key', sx: { mr: 2 }, onClick: function () { return showModal(EditApiKey, { apiKey: apiKey, serviceId: serviceId }); }, startIcon: React.createElement(PencilIcon, null), variant: 'outlined' }, t('action:edit')),
                React.createElement(ZigButton, { id: 'trader-api__delete-key', sx: { mr: 2 }, onClick: function () {
                        return askConfirm({
                            title: t('api-keys.delete-title', {
                                title: apiKey.alias,
                            }),
                            safeWord: t('action:delete'),
                            yesLabel: t('action:delete'),
                            yesButtonProps: {
                                color: 'danger',
                                variant: 'outlined',
                            },
                            description: t('api-keys.delete-description'),
                            yesAction: function () {
                                delete2FA(function (code) {
                                    return handleDeleteWrapper({ serviceId: serviceId, keyId: apiKey.id, code: code });
                                });
                            },
                        });
                    }, color: 'danger', startIcon: React.createElement(DeleteIcon, null), variant: 'outlined' }, t('action:delete'))))));
};
export default ApiKeyEntry;
//# sourceMappingURL=ApiKeyEntry.js.map