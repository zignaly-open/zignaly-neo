import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import NotFound from '../../components/Stub/NotFound';
var NotFoundPage = function () {
    var t = useTranslation('pages').t;
    useTitle(t('404'));
    return React.createElement(NotFound, null);
};
export default NotFoundPage;
//# sourceMappingURL=index.js.map