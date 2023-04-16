import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import BecomeTraderLanding from './components/BecomeTraderLanding';
var BecomeTrader = function () {
    var t = useTranslation('pages').t;
    useTitle(t('become-trader'));
    return React.createElement(BecomeTraderLanding, null);
};
export default BecomeTrader;
//# sourceMappingURL=BecomeTrader.js.map