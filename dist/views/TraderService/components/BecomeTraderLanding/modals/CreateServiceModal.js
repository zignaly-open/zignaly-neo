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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from 'components/ZModal';
import { useExchangeCoinsList } from '../../../../../apis/coin/use';
import CenteredLoader from '../../../../../components/CenteredLoader';
import InvestInYourServiceForm from './forms/InvestInYourServiceForm';
import CreateServiceForm from './forms/CreateServiceForm';
import { useCurrentBalance } from '../../../../../apis/investment/use';
import { useCreateTraderServiceMutation, useTraderServiceTypesInfoQuery, } from '../../../../../apis/service/api';
function CreateServiceModal(_a) {
    var close = _a.close, props = __rest(_a, ["close"]);
    var t = useTranslation('service').t;
    var isLoadingCoins = useExchangeCoinsList().isLoading;
    var _b = useCreateTraderServiceMutation(), isCreating = _b[1].isLoading;
    var _c = useState(0), step = _c[0], setStep = _c[1];
    var isLoadingServiceTypes = useTraderServiceTypesInfoQuery().isLoading;
    var _d = useState({}), service = _d[0], setService = _d[1];
    var isLoadingBalances = useCurrentBalance(service.baseCurrency).isFetching;
    var isLoading = isLoadingCoins ||
        isCreating ||
        isLoadingServiceTypes ||
        (isLoadingBalances && step === 1);
    var goBack = function () { return !isLoading && setStep(0); };
    return (React.createElement(ZModal, __assign({ authOnly: true, onGoBack: step === 1 && goBack, onBackdropClick: function (e) {
            e.stopPropagation();
            return false;
        }, wide: true }, props, { close: close, title: step === 1 ? t('create.invest-in-your-service') : t('create.title') }),
        isLoading && React.createElement(CenteredLoader, null),
        !isLoading && step === 0 && (React.createElement(CreateServiceForm, { service: service, onSubmit: function (s) {
                setService(s);
                setStep(1);
            } })),
        !isLoading && step === 1 && (React.createElement(InvestInYourServiceForm, { goBack: goBack, service: service }))));
}
CreateServiceModal.trackId = 'create-service';
export default CreateServiceModal;
//# sourceMappingURL=CreateServiceModal.js.map