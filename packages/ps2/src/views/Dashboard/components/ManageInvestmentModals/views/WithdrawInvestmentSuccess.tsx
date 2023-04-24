import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ZigTypography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

function WithdrawInvestmentSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('withdraw-your-investment');
  return (
    <>
      <ZigTypography variant={'body1'} color={'neutral200'}>
        {t('success.description')}
      </ZigTypography>
      <ModalActions>
        <Button
          id={'withdraw__close'}
          onClick={close}
          size={'large'}
          caption={t('success.button')}
        />
      </ModalActions>
    </>
  );
}

export default WithdrawInvestmentSuccess;
