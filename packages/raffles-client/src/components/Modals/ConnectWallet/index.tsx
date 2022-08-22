import React from 'react';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import DialogContainer from '../DialogContainer';
import { Button } from '@zignaly-open/ui';
import { ReactComponent as MetaMaskLogo } from '../../../assets/icons/metamask-logo.svg';
import { useTranslation } from 'react-i18next';
import useAuthenticate from 'hooks/useAuthenticate';
import { useEthers } from '@usedapp/core';
import SwitchNetworkModal from '../SwitchNetwork';

const ConnectWalletModal = (props: ConnectWalletModalProps) => {
  const { chainId } = useEthers();
  const authenticate = useAuthenticate();
  const { t } = useTranslation('connect-wallet');

  const connect = (e: React.MouseEvent<HTMLButtonElement>) => {
    authenticate().then(() => props.onClose(e, 'escapeKeyDown'));
  };

  if (!chainId) {
    return <SwitchNetworkModal chainId={chainId} {...props} />;
  }

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
          size='large'
          minWidth={255}
          caption={t('metamask')}
          onClick={(e) => connect(e)}
          leftElement={<MetaMaskLogo />}
        />
      </ButtonContainer>
    </DialogContainer>
  );
};

export default ConnectWalletModal;
