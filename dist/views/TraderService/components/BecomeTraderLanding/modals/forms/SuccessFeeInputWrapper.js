import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigAlertMessage, ZigTypography } from '@zignaly-open/ui';
import { SuccessFieldWrapper, SuccessFieldWrapperShit } from '../atoms';
import { ZIGNALY_PROFIT_FEE } from '../../../../../../util/constants';
var SuccessFeeInputWrapper = function (_a) {
    var children = _a.children, value = _a.value;
    var t = useTranslation('service').t;
    var feeWeCharge = !value
        ? 0
        : Math.max(0, Math.min(75, +value) - ZIGNALY_PROFIT_FEE);
    return (React.createElement(React.Fragment, null,
        React.createElement(SuccessFieldWrapper, null,
            children,
            React.createElement(SuccessFieldWrapperShit, null,
                React.createElement(ZigTypography, null, t('you-get-x', {
                    number: Math.round(feeWeCharge),
                })))),
        value === '0' && React.createElement(ZigAlertMessage, { text: t('create.zero-fee') })));
};
export default SuccessFeeInputWrapper;
//# sourceMappingURL=SuccessFeeInputWrapper.js.map