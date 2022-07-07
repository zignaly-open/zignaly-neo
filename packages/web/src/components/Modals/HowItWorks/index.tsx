import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'zignaly-ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { HowItWorksModalProps } from './types';

const HowItWorksModal = ({ ...props }: HowItWorksModalProps) => {
  const { t } = useTranslation('how-it-works');
  return (
    <DialogContainer maxWidth='md' title={t('how-zigraffle-works')} {...props}>
      <Typography variant='body1' weight='regular' color='neutral200'>
        {t('subtitle')}
      </Typography>
      <Gap gap={20} />
      <Typography variant='body1' weight='regular' color='neutral200'>
        {t('subtitle2')}
      </Typography>
      <Gap gap={50} />
    </DialogContainer>
  );
};

export default HowItWorksModal;
