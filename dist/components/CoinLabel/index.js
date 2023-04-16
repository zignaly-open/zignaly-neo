import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { Layout, WrapCoin, Coin, Icon } from './styles';
var CoinLabel = function (_a) {
    var name = _a.name, coin = _a.coin, bucket = _a.bucket;
    return (React.createElement(Layout, null,
        React.createElement(Icon, { coin: coin, name: name, bucket: bucket }),
        React.createElement(WrapCoin, null,
            React.createElement(Coin, null, coin),
            React.createElement(ZigTypography, { variant: 'body2', color: 'neutral300' }, name))));
};
export default CoinLabel;
//# sourceMappingURL=index.js.map