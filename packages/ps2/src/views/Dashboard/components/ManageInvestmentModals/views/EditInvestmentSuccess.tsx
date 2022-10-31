import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { Highline } from '../styles';

function EditInvestmentSuccessModal({ close }: { close: () => void }) {
  const { t } = useTranslation('edit-investment');
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
