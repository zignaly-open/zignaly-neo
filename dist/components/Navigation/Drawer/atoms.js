import { ExpandLess, ChevronRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Avatar, DropDown } from '@zignaly-open/ui';
import { useActiveExchange, useCurrentUser, useSelectExchange, } from 'apis/user/use';
import React from 'react';
import { getImageOfAccount } from 'util/images';
import { AccountName } from '../AccountMenu/styles';
export var DropdownExchangeAccount = function () {
    var exchanges = useCurrentUser().exchanges;
    var activeExchange = useActiveExchange();
    var selectExchange = useSelectExchange();
    var setActiveExchange = function (exchangeInternalId) {
        selectExchange(exchangeInternalId);
    };
    return (React.createElement(DropDown, { component: function (_a) {
            var open = _a.open;
            return (React.createElement(Box, { display: 'flex', gap: 1, justifyContent: 'center' },
                React.createElement(Avatar, { size: 'medium', image: activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.image }),
                React.createElement(AccountName, { variant: 'body1', color: 'neutral100' }, activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalName),
                open ? React.createElement(ExpandLess, null) : React.createElement(ChevronRight, null)));
        }, options: ((exchanges === null || exchanges === void 0 ? void 0 : exchanges.length) > 1 ? exchanges : []).map(function (exchange, index) { return ({
            onClick: function () { return setActiveExchange(exchange.internalId); },
            id: "drawer-account-switcher-dropdown__account-".concat(index),
            label: (React.createElement(React.Fragment, null,
                React.createElement(Avatar, { size: 'medium', image: getImageOfAccount(index) }),
                React.createElement(AccountName, { variant: 'body1', color: (activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalId) === exchange.internalId
                        ? 'highlighted'
                        : 'neutral200' }, exchange.internalName))),
        }); }) }));
};
//# sourceMappingURL=atoms.js.map