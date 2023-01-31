import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <>
      <ZigTypography color={'neutral200'}>
        {t('modalSuccess.description')}
      </ZigTypography>
      <ModalActions>
        <Button
          onClick={close}
          size={'large'}
          caption={t('modalSuccess.button')}
        />
      </ModalActions>
    </>
  );
}

export default EditInvestmentSuccessModal;
