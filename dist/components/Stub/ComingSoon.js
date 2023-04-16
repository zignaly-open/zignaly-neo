import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';
var ComingSoon = function () {
    var t = useTranslation('common').t;
    return (React.createElement(Stub, { title: t('coming-soon.title'), description: t('coming-soon.description') }));
};
export default ComingSoon;
//# sourceMappingURL=ComingSoon.js.map