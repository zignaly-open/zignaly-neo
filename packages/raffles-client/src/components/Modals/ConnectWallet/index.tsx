import React from 'react';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import DialogContainer from '../DialogContainer';
import { Button } from '@zignaly-open/ui';
import { ReactComponent as MetaMaskLogo } from '../../../assets/icons/metamask-logo.svg';
import { useTranslation } from 'react-i18next';
import useAuthenticate from 'hooks/useAuthenticate';

const ConnectWalletModal = (props: ConnectWalletModalProps) => {
  const authenticate = useAuthenticate();
  const { t } = useTranslation('connect-wallet');

  const connect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    authenticate().then(() => props.onClose(e, 'escapeKeyDown'));
  };

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
          caption={t('metamask')}
          onClick={(e) => connect(e)}
          leftElement={<MetaMaskLogo />}
        />
      </ButtonContainer>
    </DialogContainer>
  );
};

export default ConnectWalletModal;
