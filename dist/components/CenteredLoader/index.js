import { Center } from './styles';
import { Loader } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
var CenteredLoader = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 40 : _b, _c = _a.height, height = _c === void 0 ? 40 : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var t = useTranslation().t;
    return (React.createElement(Center, { className: className },
        React.createElement(Loader, { color: '#fff', width: width + 'px', height: height + 'px', ariaLabel: t('loading') })));
};
export default CenteredLoader;
//# sourceMappingURL=index.js.map