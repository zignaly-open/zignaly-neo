import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

function WithdrawInvestmentSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('withdraw-your-investment');
  return (
    <>
      <ZigTypography variant={'body1'} color={'neutral200'}>
        {t('success.description')}
      </ZigTypography>
      <ModalActions>
        <ZigButton id={'withdraw__close'} onClick={close} size={'large'}>
          {t('success.button')}
        </ZigButton>
      </ModalActions>
    </>
  );
}

export default WithdrawInvestmentSuccess;
