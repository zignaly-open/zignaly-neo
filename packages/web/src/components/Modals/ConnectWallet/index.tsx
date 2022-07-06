import React from 'react';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import DialogContainer from '../DialogContainer';
import { Button } from 'zignaly-ui';
import { ReactComponent as MetaMaskLogo } from '../../../assets/icons/metamask-logo.svg';
import { ReactComponent as WalletConnectLogo } from '../../../assets/icons/walletconnect-logo.svg';
import { useTranslation } from 'react-i18next';

const ConnectWalletModal = ({
  metaMaskOnClick = () => {},
  walletConnectOnClick = () => {},
  ...props
}: ConnectWalletModalProps) => {
  const { t } = useTranslation('connect-wallet');
  return (
    <DialogContainer title={t('title')} {...props}>
      <Gap gap={8} />
      <Subtitle variant='body1' weight='regular' color='neutral200'>
        {t('subtitle')}
      </Subtitle>
      <Gap gap={20} />
      <ButtonContainer>
        <Button
          minWidth={255}
          size='large'
          caption='METAMASK'
          onClick={() => metaMaskOnClick()}
          leftElement={<MetaMaskLogo />}
        />
        <Gap gap={8} />
        <Button
          minWidth={255}
          size='large'
          caption='WALLETCONNECT'
          onClick={() => walletConnectOnClick()}
          leftElement={<WalletConnectLogo />}
        />
      </ButtonContainer>
    </DialogContainer>
  );
};

export default ConnectWalletModal;
