import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { Actions } from '../forms/EditInvestmentForm/styles';

function WithdrawSuccess({ close }: { close: () => void }) {
  const { t } = useTranslation('withdraw-your-investment');
  return (
    <>
      <Typography variant={'body1'} color={'neutral200'}>
        {t('withdraw-your-investment.success.description')}
      </Typography>
      <Actions>
        <Button
          onClick={close}
          size={'large'}
          caption={t('withdraw-your-investment.success.button')}
        />
      </Actions>
    </>
  );
}

export default WithdrawSuccess;
