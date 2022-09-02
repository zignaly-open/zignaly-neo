import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { Highline } from '../styles';
import { Actions } from '../forms/EditInvestmentForm/styles';
import { useCoins, useInvestments } from '../../../use';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  const { refetch: refetchInvestments } = useInvestments();
  const { refetch: refetchCoins } = useCoins();
  useEffect(() => {
    refetchInvestments();
    refetchCoins();
  }, []);
  return (
    <>
      <Typography variant={'body1'} color={'neutral200'}>
        <Trans
          i18nKey={'edit-investment.modalSuccess.description'}
          t={t}
          components={[<Highline key={'highline'} />]}
        />
      </Typography>
      <Actions>
        <Button
          onClick={close}
          size={'large'}
          caption={t('edit-investment.modalSuccess.button')}
        />
      </Actions>
    </>
  );
}

export default EditInvestmentSuccessModal;
