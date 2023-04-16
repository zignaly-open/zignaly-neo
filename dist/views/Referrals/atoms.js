import React from 'react';
import { TotalBoxBox, TotalBoxValue } from './styles';
import { ZigTypography } from '@zignaly-open/ui';
export var TotalBox = function (_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement(TotalBoxBox, null,
        React.createElement(ZigTypography, null, label),
        React.createElement(TotalBoxValue, null, value)));
};
export var GetWhatYouDeserveBox = function (_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement(TotalBoxBox, null,
        React.createElement(ZigTypography, null, label),
        React.createElement(TotalBoxValue, null, value)));
};
//# sourceMappingURL=atoms.js.map