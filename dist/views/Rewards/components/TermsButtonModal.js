import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import { useZAlert } from '../../../components/ZModal/use';
import { UlList } from '../../Referrals/styles';
import { Box } from '@mui/material';
var TermsButtonModal = function () {
    var t = useTranslation('rewards').t;
    var showAlert = useZAlert();
    var showTerms = useCallback(function () {
        showAlert({
            title: t('full-terms.title'),
            okLabel: t('common:ok'),
            description: (React.createElement(Box, { sx: { maxWidth: 650 } },
                React.createElement(UlList, null, new Array(7).fill(0).map(function (_, i) { return (React.createElement("li", { key: "full-term-".concat(i) },
                    React.createElement(ZigTypography, null, t("full-terms.".concat(i + 1))))); })))),
        });
    }, [t]);
    return React.createElement(TextButton, { caption: t('terms'), onClick: function () { return showTerms(); } });
};
export default TermsButtonModal;
//# sourceMappingURL=TermsButtonModal.js.map