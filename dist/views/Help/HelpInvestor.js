import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ComingSoon from '../../components/Stub/ComingSoon';
var HelpInvestor = function () {
    var t = useTranslation('pages').t;
    useTitle(t('help'));
    return React.createElement(ComingSoon, null);
};
export default HelpInvestor;
//# sourceMappingURL=HelpInvestor.js.map