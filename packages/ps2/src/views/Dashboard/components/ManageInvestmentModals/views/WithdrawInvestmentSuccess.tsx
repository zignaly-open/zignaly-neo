import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigButton,
  ZigModalActions,
  ZigModalForm,
  ZigTypography,
} from '@zignaly-open/ui';

function WithdrawInvestmentSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <ZigModalForm component='div'>
      <ZigTypography
        variant={'body1'}
        color={'neutral200'}
        id={'withdraw-modal-success__description'}
        textAlign={'center'}
      >
        {t('withdrawal-success.description')}
      </ZigTypography>
      <ZigModalActions>
        <ZigButton
          id={'withdraw-modal-success__close'}
          onClick={close}
          size={'large'}
        >
          {t('withdrawal-success.button')}
        </ZigButton>
      </ZigModalActions>
    </ZigModalForm>
  );
}

export default WithdrawInvestmentSuccess;
