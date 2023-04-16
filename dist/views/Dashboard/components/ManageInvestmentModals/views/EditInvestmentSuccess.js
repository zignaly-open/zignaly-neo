import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
function EditInvestmentSuccessModal(_a) {
    var close = _a.close;
    var t = useTranslation('edit-investment').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(ZigTypography, { color: 'neutral200' }, t('modalSuccess.description')),
        React.createElement(ModalActions, null,
            React.createElement(Button, { id: 'invest-success__close', onClick: close, size: 'large', caption: t('modalSuccess.button') }))));
}
export default EditInvestmentSuccessModal;
//# sourceMappingURL=EditInvestmentSuccess.js.map