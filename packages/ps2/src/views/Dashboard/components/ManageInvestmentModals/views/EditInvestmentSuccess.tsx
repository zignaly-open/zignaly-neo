import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <>
      <ZigTypography color={'neutral200'}>
        {t('modalSuccess.description')}
      </ZigTypography>
      <ModalActions>
        <ZigButton id={'invest-success__close'} onClick={close} size={'large'}>
          {t('modalSuccess.button')}
        </ZigButton>
      </ModalActions>
    </>
  );
}

export default EditInvestmentSuccessModal;
