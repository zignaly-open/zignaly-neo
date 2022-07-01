import React from 'react';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import ModalContainer from '../ModalContainer';
import { Button } from 'zignaly-ui';
import { ReactComponent as MetaMaskLogo } from '../../../assets/icons/metamask-logo.svg';
import { ReactComponent as WalletConnectLogo } from '../../../assets/icons/walletconnect-logo.svg';

const ConnectWalletModal = ({
  onClickClose = () => {},
  metaMaskOnClick = () => {},
  walletConnectOnClick = () => {},
}: ConnectWalletModalProps) => {
  return (
    <ModalContainer
      centerHeaderText={true}
      title='Connect Wallet'
      width={800}
      onClickClose={onClickClose}
    >
      <Gap gap={12} />
      <Subtitle variant='body1' weight='regular' color='neutral200'>
        To continue, you need to connect your wallet with one of these
        providers:
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
    </ModalContainer>
  );
};

export default ConnectWalletModal;
