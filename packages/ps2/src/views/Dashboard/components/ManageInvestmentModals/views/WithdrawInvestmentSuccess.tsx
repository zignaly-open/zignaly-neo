import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions, Form } from 'components/ZModal';

function WithdrawInvestmentSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  return (
    <Form component='div'>
      <ZigTypography
        variant={'body1'}
        color={'neutral200'}
        id={'withdraw-modal-success__description'}
        textAlign={'center'}
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
    </Form>
  );
}

export default WithdrawInvestmentSuccess;
