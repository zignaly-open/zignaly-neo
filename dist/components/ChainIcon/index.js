import React from 'react';
import BSCIcon from 'images/chain/bsc.svg';
import ETHIcon from 'images/chain/eth.svg';
import MATICIcon from 'images/chain/matic.svg';
import { ZigCoinIcon } from '@zignaly-open/ui';
export var getChainIcon = function (chain) {
    switch (chain.toUpperCase()) {
        case 'ETH':
            return ETHIcon;
        case 'BSC':
            return BSCIcon;
        case 'MATIC':
            return MATICIcon;
        default:
            return null;
    }
};
var ChainIcon = function (_a) {
    var network = _a.network;
    var icon = getChainIcon(network);
    return icon ? (React.createElement("img", { width: 24, height: 24, src: icon })) : (React.createElement(ZigCoinIcon, { size: 'small', coin: network }));
};
export default ChainIcon;
//# sourceMappingURL=index.js.map