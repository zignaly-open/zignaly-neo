import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

function WithdrawInvestmentSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <>
      <ZigTypography
        variant={'body1'}
        color={'neutral200'}
        id={'withdraw-modal-success__description'}
      >
        {t('withdrawal-success.description')}
      </ZigTypography>
      <ModalActions>
        <ZigButton
          id={'withdraw-modal-success__close'}
          onClick={close}
          size={'large'}
        >
          {t('withdrawal-success.button')}
        </ZigButton>
      </ModalActions>
    </>
  );
}

export default WithdrawInvestmentSuccess;
