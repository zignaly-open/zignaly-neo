import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../components/ZModal';
import { ZDialogProps } from '../../../components/ZModal/types';

const ReferralInviteModal: React.FC<ZDialogProps> = (props) => {
  const { t } = useTranslation(['referrals', 'pages']);
  return (
    <ZModal wide {...props} close={close}>
      {t('fff')}
    </ZModal>
  );
};

export default ReferralInviteModal;
