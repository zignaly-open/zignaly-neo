import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Layout, Field, Button, Container, Item } from './styles';
import { Typography, Avatar, ArrowBottomIcon } from '@zignaly-open/ui';
import { getImageOfAccount } from '../../../../util/images';
import { useActiveExchange, useSelectExchange, useCurrentUser, } from '../../../../apis/user/use';
var AccountSelector = function (_a) {
    var onExchangeSelected = _a.onExchangeSelected;
    var theme = useTheme();
    var exchanges = useCurrentUser().exchanges;
    var activeExchange = useActiveExchange();
    var selectExchange = useSelectExchange();
    var _b = useState(false), isDropdownShown = _b[0], setIsDropdownShown = _b[1];
    var setActiveExchange = function (exchangeInternalId) {
        selectExchange(exchangeInternalId);
        setIsDropdownShown(false);
        onExchangeSelected();
    };
    var hasMultipleExchanges = exchanges.length > 1;
    if (!activeExchange) {
        return null;
    }
    return (React.createElement(Layout, { isActive: isDropdownShown },
        React.createElement(Button, { isMenu: hasMultipleExchanges, onClick: function () { return hasMultipleExchanges && setIsDropdownShown(function (x) { return !x; }); } },
            React.createElement(Field, null,
                React.createElement(Avatar, { size: 'medium', image: activeExchange.image }),
                React.createElement(Typography, { variant: 'body1', color: 'neutral100' }, activeExchange.internalName)),
            hasMultipleExchanges && (React.createElement(ArrowBottomIcon, { color: theme.palette.neutral300, width: '22px', height: '22px' }))),
        isDropdownShown && (React.createElement(Container, null, exchanges.map(function (exchange, index) { return (React.createElement(Item, { key: exchange.internalId, onClick: function () { return setActiveExchange(exchange.internalId); } },
            React.createElement(Avatar, { size: 'medium', image: getImageOfAccount(index) }),
            React.createElement(Typography, { variant: 'body1', color: activeExchange.internalId === exchange.internalId
                    ? 'highlighted'
                    : 'neutral200' }, exchange.internalName))); })))));
};
export default AccountSelector;
//# sourceMappingURL=index.js.map