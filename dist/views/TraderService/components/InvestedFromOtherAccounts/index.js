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
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useIsInvestedInService } from '../../../../apis/investment/use';
import ZModal from '../../../../components/ZModal';
import { TextButton, ZigTable, ZigTablePriceLabel, ZigTypography, } from '@zignaly-open/ui';
import { useActiveExchange, useCurrentUser, useSelectExchange, } from '../../../../apis/user/use';
import { Box } from '@mui/material';
import BigNumber from 'bignumber.js';
function InvestedFromOtherAccounts(_a) {
    var close = _a.close, service = _a.service, props = __rest(_a, ["close", "service"]);
    var isInvested = useIsInvestedInService(service.id);
    var exchanges = useCurrentUser().exchanges;
    var selectExchange = useSelectExchange();
    var activeExchange = useActiveExchange();
    var t = useTranslation('service').t;
    var allInvestedServices = useMemo(function () {
        return Object.entries(isInvested === null || isInvested === void 0 ? void 0 : isInvested.accounts).map(function (_a) {
            var _b;
            var internalId = _a[0], data = _a[1];
            return ({
                account: (_b = exchanges === null || exchanges === void 0 ? void 0 : exchanges.find(function (x) { return x.internalId === internalId; })) === null || _b === void 0 ? void 0 : _b.internalName,
                invested: new BigNumber((data === null || data === void 0 ? void 0 : data.invested) || 0)
                    .plus((data === null || data === void 0 ? void 0 : data.pending) || 0)
                    .toString(),
                internalId: internalId,
            });
        });
    }, [isInvested === null || isInvested === void 0 ? void 0 : isInvested.accounts]);
    return (React.createElement(ZModal, __assign({}, props, { close: close, title: t('other-accounts.title'), isLoading: isInvested.isLoading }),
        React.createElement(Box, { mt: 3 },
            React.createElement(ZigTable, { prefixId: 'invested-from-others', columns: [
                    {
                        header: t('other-accounts.account'),
                        accessorKey: 'account',
                    },
                    {
                        header: t('other-accounts.invested'),
                        accessorKey: 'invested',
                        cell: function (_a) {
                            var getValue = _a.getValue;
                            return (React.createElement(ZigTablePriceLabel, { exact: true, coin: service.ssc, value: getValue() }));
                        },
                    },
                    {
                        header: '',
                        id: 'internalId',
                        accessorKey: 'internalId',
                        cell: function (_a) {
                            var getValue = _a.getValue;
                            return getValue() === activeExchange.internalId ? (React.createElement(ZigTypography, { color: 'neutral500' }, t('other-accounts.active'))) : (React.createElement(TextButton, { id: "all-accounts__switch-".concat(service.id), leftElement: React.createElement(CompareArrowsIcon, { sx: {
                                        color: function (theme) { return theme.palette.links; },
                                    }, width: 16, height: 16 }), caption: t('other-accounts.switch-action'), color: 'links', onClick: function () { return selectExchange(getValue()); } }));
                        },
                    },
                ], data: allInvestedServices, columnVisibility: false, pagination: false }))));
}
export default InvestedFromOtherAccounts;
//# sourceMappingURL=index.js.map