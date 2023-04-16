import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText } from './styles';
import { Avatar, IconButton, ZigTypography, ArrowBottomIcon, } from '@zignaly-open/ui';
import { useActiveExchange } from '../../../../apis/user/use';
import AccountSelector from 'components/AccountSelector';
var BalanceAccountSelector = function () {
    var theme = useTheme();
    var t = useTranslation('common').t;
    var activeExchange = useActiveExchange();
    if (!activeExchange) {
        return null;
    }
    return (React.createElement(Layout, null,
        React.createElement(Avatar, { size: 'xxlarge', image: activeExchange.image }),
        React.createElement(Data, null,
            React.createElement(Inline, null,
                React.createElement(ZigTypography, { variant: 'h1' }, activeExchange.internalName),
                React.createElement(AccountSelector, { component: function (_a) {
                        var open = _a.open;
                        return (React.createElement(IconButton, { id: 'balance__account-switcher', variant: 'secondary', size: 'medium', isFocused: open, icon: React.createElement(ArrowBottomIcon, { color: open ? theme.palette.neutral100 : theme.palette.neutral300, width: 22, height: 20 }) }));
                    } })),
            React.createElement(TypeText, { variant: 'h4' },
                React.createElement("span", null, t('account-selector.type.title')),
                React.createElement("span", null, t('account-selector.type.' +
                    (activeExchange.exchangeType === 'futures'
                        ? 'futures'
                        : 'spot')))))));
};
export default BalanceAccountSelector;
//# sourceMappingURL=index.js.map