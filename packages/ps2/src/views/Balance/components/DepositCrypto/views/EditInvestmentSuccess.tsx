import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { Highline } from '../styles';
import { useInvestments } from '../../../../../apis/investment/use';
import { useActiveExchange } from '../../../../../apis/user/use';
import { useCoinBalances } from '../../../../../apis/coin/use';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
  const exchange = useActiveExchange();
  const { refetch: refetchInvestments } = useInvestments(exchange?.internalId);
  const { refetch: refetchCoins } = useCoinBalances();
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
