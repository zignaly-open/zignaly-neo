import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { Highline } from '../styles';
import { useCoins, useInvestments } from '../../../use';
import { ModalActions } from 'components/ModalContainer/styles';
import { useActiveExchange } from '../../../../user/use';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  const exchange = useActiveExchange();
  const { refetch: refetchInvestments } = useInvestments(exchange?.internalId);
  const { refetch: refetchCoins } = useCoins();
  useEffect(() => {
    refetchInvestments();
    refetchCoins();
  }, []);
  return (
    <>
      <Typography variant={'body1'} color={'neutral200'}>
        <Trans
          i18nKey={'modalSuccess.description'}
          t={t}
          components={[<Highline key={'highline'} />]}
        />
      </Typography>
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
