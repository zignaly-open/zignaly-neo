import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';
var CriticalError = function () {
    var t = useTranslation('common').t;
    return (React.createElement(Stub, { title: t('critical-error.title'), description: t('critical-error.description') }));
};
export default CriticalError;
//# sourceMappingURL=CriticalError.js.map