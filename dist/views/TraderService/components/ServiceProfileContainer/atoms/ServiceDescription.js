import React from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownSection from './MarkdownSection';
import { Box } from '@mui/material';
var ServiceDescription = function (_a) {
    var service = _a.service;
    var t = useTranslation('service').t;
    return (React.createElement(Box, { id: 'service-profile__description' },
        React.createElement(MarkdownSection, { content: service.description, title: t('strategy'), emptyText: t('strategy-empty') })));
};
export default ServiceDescription;
//# sourceMappingURL=ServiceDescription.js.map