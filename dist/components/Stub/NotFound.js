import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';
var NotFound = function () {
    var t = useTranslation('common').t;
    return React.createElement(Stub, { title: t('404.title'), description: t('404.description') });
};
export default NotFound;
//# sourceMappingURL=NotFound.js.map