import React from 'react';
import { useTranslation } from 'react-i18next';
import { LiquidatedLabel as LiquidatedLabelElement } from '../styles';
import { Typography } from '@zignaly-open/ui';
var LiquidatedLabel = function () {
    var t = useTranslation('service').t;
    return (React.createElement(LiquidatedLabelElement, { sx: { p: 2.5 } },
        React.createElement(Typography, { weight: 'demibold', variant: 'buttonxl', color: 'redGraphOrError' }, t('liquidated'))));
};
export default LiquidatedLabel;
//# sourceMappingURL=LiquidatedLabel.js.map