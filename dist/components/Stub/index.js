import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { Layout } from './styles';
var Stub = function (_a) {
    var id = _a.id, title = _a.title, description = _a.description;
    return (React.createElement(Layout, { id: id },
        React.createElement(ZigTypography, { variant: 'h1' }, title),
        React.createElement(ZigTypography, { variant: 'subtitle1' }, description)));
};
export default Stub;
//# sourceMappingURL=index.js.map