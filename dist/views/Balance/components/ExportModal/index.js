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
import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useTransactionsHistoryCsvMutation } from 'apis/coin/api';
import { useActiveExchange } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { differenceInDays } from 'date-fns';
function ExportModal(_a) {
    var close = _a.close, type = _a.type, props = __rest(_a, ["close", "type"]);
    var t = useTranslation('transactions-history').t;
    var _b = useTransactionsHistoryCsvMutation(), exportCsv = _b[0], exportStatus = _b[1];
    var _c = useActiveExchange(), internalId = _c.internalId, createdAt = _c.createdAt;
    var toast = useToast();
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { close: close, title: t('export.title') }),
        React.createElement(ZigTypography, null, t('export.description')),
        React.createElement(ModalActions, null,
            React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large', id: 'export-transactions__cancel' }, t('action:cancel')),
            React.createElement(ZigButton, { id: 'export-transactions__proceed', onClick: function () {
                    return exportCsv({
                        exchangeInternalId: internalId,
                        type: type,
                        days: differenceInDays(new Date(), new Date(createdAt)) + 1,
                    }).then(function () {
                        toast.success(t('export.success'));
                        close();
                    });
                }, variant: 'contained', size: 'large', loading: exportStatus.isLoading }, t('action:proceed')))));
}
export default ExportModal;
//# sourceMappingURL=index.js.map