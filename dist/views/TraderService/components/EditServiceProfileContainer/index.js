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
import React, { useMemo, useState } from 'react';
import { TraderServiceAccessLevel, } from '../../../../apis/service/types';
import { Box, Grid, InputAdornment } from '@mui/material';
import { ZigButton, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import ServiceLogo from '../ServiceLogo';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditServiceValidation } from './validations';
import { Controller, useForm } from 'react-hook-form';
import { useTraderServiceEditMutation } from 'apis/service/api';
import { VISIBILITY_LABEL } from './types';
import { StyledZigSelect } from './styles';
import { ExternalLink } from 'components/AnchorLink';
import { HELP_CREATE_SERVICE_MARKETPLACE_URL } from 'util/constants';
import { generatePath, useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import { ROUTE_TRADING_SERVICE } from 'routes';
import { useCurrentUser } from 'apis/user/use';
import SuccessFeeInputWrapper from '../BecomeTraderLanding/modals/forms/SuccessFeeInputWrapper';
var getVisibility = function (level) {
    if (level < TraderServiceAccessLevel.Private) {
        return TraderServiceAccessLevel.Solo;
    }
    else if (level < TraderServiceAccessLevel.Public) {
        return TraderServiceAccessLevel.Private;
    }
    else if (level < TraderServiceAccessLevel.Marketplace) {
        return TraderServiceAccessLevel.Public;
    }
    else {
        return TraderServiceAccessLevel.Marketplace;
    }
};
var EditServiceProfileContainer = function (_a) {
    var service = _a.service;
    var t = useTranslation('service').t;
    var defaultValues = {
        name: service.name,
        description: service.description,
        maximumSbt: service.maximumSbt,
        successFee: service.successFee,
        logo: service.logo,
    };
    var _b = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        defaultValues: defaultValues,
        resolver: yupResolver(EditServiceValidation),
    }), handleSubmit = _b.handleSubmit, control = _b.control, watch = _b.watch, errors = _b.formState.errors, reset = _b.reset;
    var _c = useTraderServiceEditMutation(), edit = _c[0], editStatus = _c[1];
    var _d = useState(getVisibility(service.level)), visibility = _d[0], setVisibility = _d[1];
    var navigate = useNavigate();
    var user = useCurrentUser();
    var submit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, edit(__assign(__assign({ id: service.id }, data), { level: visibility }))];
                case 1:
                    _a.sent();
                    back();
                    return [2];
            }
        });
    }); };
    useUpdateEffect(function () {
        reset(defaultValues);
        setVisibility(getVisibility(service.level));
    }, [service.id]);
    var visibilityOptions = useMemo(function () { return [
        {
            value: TraderServiceAccessLevel.Solo,
            label: t('edit.visibility.unlisted'),
            disabled: true,
        },
        {
            value: TraderServiceAccessLevel.Private,
            label: t('edit.visibility.private'),
        },
        {
            value: TraderServiceAccessLevel.Public,
            label: t('edit.visibility.public'),
        },
        {
            value: TraderServiceAccessLevel.Marketplace,
            label: t('edit.visibility.marketplace'),
            disabled: !(user === null || user === void 0 ? void 0 : user.isSupport),
        },
    ]; }, [t]);
    var selectStyles = {
        option: function (styles, _a) {
            var data = _a.data;
            var value = data.value;
            if (value === TraderServiceAccessLevel.Solo ||
                (value === TraderServiceAccessLevel.Marketplace && !(user === null || user === void 0 ? void 0 : user.isSupport))) {
                return {
                    display: 'none',
                };
            }
            return __assign(__assign({}, styles), { cursor: 'pointer', color: VISIBILITY_LABEL[value].color, fontSize: '17px', padding: '16px 14px' });
        },
    };
    var back = function () {
        return navigate(generatePath(ROUTE_TRADING_SERVICE, {
            serviceId: service.id.toString(),
        }));
    };
    return (React.createElement(Box, { onSubmit: handleSubmit(submit), component: 'form', pt: 7 },
        React.createElement(ZigTypography, { textAlign: 'center', variant: 'h1' }, t('edit.title')),
        React.createElement(Grid, { container: true, mt: 8, gap: 2 },
            React.createElement(Grid, { item: true, sm: 12, md: 2, pb: 2 },
                React.createElement(Controller, { name: 'logo', control: control, render: function (_a) {
                        var field = _a.field;
                        return React.createElement(ServiceLogo, __assign({ service: service }, field));
                    } })),
            React.createElement(Grid, { container: true, sm: 12, md: 7, pb: 2, alignItems: 'flex-start', gap: 6 },
                React.createElement(Controller, { name: 'name', control: control, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('edit.name'), error: t((_b = errors.name) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                    } }),
                React.createElement(Controller, { name: 'description', control: control, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('edit.description'), error: t((_b = errors.description) === null || _b === void 0 ? void 0 : _b.message), multiline: true, rows: 18 }, field)));
                    } }),
                React.createElement(Grid, { item: true, container: true, columnSpacing: 6, rowSpacing: 6 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Controller, { name: 'successFee', control: control, render: function (_a) {
                                var _b;
                                var field = _a.field;
                                return (React.createElement(SuccessFeeInputWrapper, { value: watch('successFee') || 0 },
                                    React.createElement(ZigInput, __assign({ InputProps: {
                                            endAdornment: (React.createElement(InputAdornment, { position: 'end' }, "%")),
                                        }, fullWidth: true, label: React.createElement("div", null,
                                            t('summary.success-fee'),
                                            React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t('edit.success-fee-desc'))), error: t((_b = errors.successFee) === null || _b === void 0 ? void 0 : _b.message) }, field))));
                            } })),
                    React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(Controller, { name: 'maximumSbt', control: control, render: function (_a) {
                                var _b;
                                var field = _a.field;
                                return (React.createElement(ZigInput, __assign({ InputProps: {
                                        endAdornment: (React.createElement(InputAdornment, { position: 'end' }, service.ssc)),
                                    }, fullWidth: true, label: React.createElement("div", null,
                                        t('edit.pool-size'),
                                        React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t('edit.pool-size-desc'))), error: t((_b = errors.maximumSbt) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                            } }))),
                React.createElement(Grid, { item: true, container: true, columnSpacing: 6, alignItems: 'center', rowSpacing: 2 },
                    React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(StyledZigSelect, { options: visibilityOptions, label: t('edit.visibility.visibility'), value: visibility, onChange: setVisibility, styles: selectStyles }),
                        React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t("edit.visibility.".concat(VISIBILITY_LABEL[visibility].key, "-desc")))),
                    React.createElement(Grid, { item: true, md: 6, sm: 12, alignItems: 'center', justifyContent: 'center', display: 'flex' },
                        React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' },
                            React.createElement(Trans, { i18nKey: 'edit.visibility.marketplace-requirements', t: t, components: [
                                    React.createElement(ExternalLink, { href: HELP_CREATE_SERVICE_MARKETPLACE_URL, key: 0 }),
                                ] })))),
                React.createElement(Grid, { item: true, container: true, justifyContent: 'flex-end', spacing: 1, gap: 2, mb: 2 },
                    React.createElement(ZigButton, { variant: 'outlined', size: 'large', onClick: back }, t('action:cancel')),
                    React.createElement(ZigButton, { variant: 'contained', type: 'submit', loading: editStatus.isLoading, size: 'large' }, t('edit.save')))))));
};
export default EditServiceProfileContainer;
//# sourceMappingURL=index.js.map