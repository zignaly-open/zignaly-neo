import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ModalContainer/styles';

function WithdrawSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('withdraw-your-investment');
  return (
    <>
      <Typography variant={'body1'} color={'neutral200'}>
        {t('withdraw-your-investment.success.description')}
      </Typography>
      <ModalActions>
        <Button
          onClick={close}
          size={'large'}
          caption={t('withdraw-your-investment.success.button')}
        />
      </ModalActions>
    </>
  );
}

export default WithdrawSuccess;
