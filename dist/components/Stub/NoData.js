import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';
var NoData = function () {
    var t = useTranslation('common').t;
    return (React.createElement(Stub, { title: t('no-data.title'), description: t('no-data.description') }));
};
export default NoData;
//# sourceMappingURL=NoData.js.map