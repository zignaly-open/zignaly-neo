import React from 'react';
import { Item, InternalName } from './styles';
import { Avatar, DropDown } from '@zignaly-open/ui';
import { useActiveExchange, useCurrentUser, useSelectExchange, } from '../../apis/user/use';
import { getImageOfAccount } from '../../util/images';
var AccountSelector = function (_a) {
    var component = _a.component, exchangeFilter = _a.exchangeFilter;
    var user = useCurrentUser();
    var activeExchange = useActiveExchange();
    var selectExchange = useSelectExchange();
    if (!activeExchange) {
        return null;
    }
    var exchanges = user.exchanges || [];
    return (React.createElement(React.Fragment, null, user.exchanges.length > 1 && (React.createElement(DropDown, { component: component, options: exchanges
            .filter(exchangeFilter || Boolean)
            .map(function (exchange) {
            var index = exchanges.indexOf(exchange);
            return {
                onClick: function () { return selectExchange(exchange.internalId); },
                label: (React.createElement(Item, { id: "account-exchangeId-".concat(exchange.internalId), key: "--exchange-key-".concat(index.toString()) },
                    React.createElement(Avatar, { size: 'medium', image: getImageOfAccount(index) }),
                    React.createElement(InternalName, { variant: 'body1', color: activeExchange.internalId === exchange.internalId
                            ? 'highlighted'
                            : 'neutral200' }, exchange.internalName))),
            };
        }) }))));
};
export default AccountSelector;
//# sourceMappingURL=index.js.map