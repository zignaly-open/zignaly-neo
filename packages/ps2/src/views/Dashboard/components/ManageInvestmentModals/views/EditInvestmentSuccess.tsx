import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { Box } from '@mui/material';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <Box textAlign={'center'}>
      <ZigTypography
        color={'neutral200'}
        id={'edit-investment-success-modal__description'}
      >
        {t('modalSuccess.description')}
      </ZigTypography>
      <ModalActions>
        <ZigButton
          id={'edit-investment-success-modal__close'}
          onClick={close}
          size={'large'}
        >
          {t('modalSuccess.button')}
        </ZigButton>
      </ModalActions>
    </Box>
  );
}

export default EditInvestmentSuccessModal;
