import React from 'react';
import { Box } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Link } from '@mui/material';
import { HELP_MANAGE_FUNDS_URL } from 'util/constants';
var ManagementHelper = function () {
    var t = useTranslation('management').t;
    return (React.createElement(Box, { sx: { mt: 10, textAlign: 'center' } },
        React.createElement(ZigTypography, { color: 'neutral400' },
            React.createElement(Trans, { i18nKey: 'helper', t: t },
                React.createElement(Link, { href: HELP_MANAGE_FUNDS_URL, target: '_blank' })))));
};
export default ManagementHelper;
//# sourceMappingURL=index.js.map