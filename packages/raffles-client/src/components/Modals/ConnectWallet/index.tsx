import React, { useEffect } from 'react';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import DialogContainer from '../DialogContainer';
import { Button } from '@zignaly-open/ui';
import { ReactComponent as MetaMaskLogo } from '../../../assets/icons/metamask-logo.svg';
import { useTranslation } from 'react-i18next';
import useAuthenticate from 'hooks/useAuthenticate';
import { useMediaQuery } from '@mui/material';
import theme from 'theme';
import useCurrentUser from 'hooks/useCurrentUser';

const ConnectWalletModal = (props: ConnectWalletModalProps) => {
  const authenticate = useAuthenticate();
  const { t } = useTranslation('connect-wallet');
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user) {
      // Close modal once user is connected
      props.onClose(null, 'escapeKeyDown');
    }
  }, [user]);

  return (
    <DialogContainer title={t('title')} {...props}>
      <Gap gap={8} />
      <Subtitle variant='body1' weight='regular' color='neutral200'>
        {t('subtitle')}
      </Subtitle>
      <Gap gap={20} />
      <ButtonContainer>
        <Button
          variant='primary'
          minWidth={matchesSmall ? 255 : 180}
          size={matchesSmall ? 'xlarge' : 'large'}
          caption={t('metamask')}
          onClick={authenticate}
          leftElement={<MetaMaskLogo />}
        />
      </ButtonContainer>
    </DialogContainer>
  );
};

export default ConnectWalletModal;
