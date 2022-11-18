import { Box, CircularProgress } from '@mui/material';
import { getIsCoinbaseWallet, getIsInjected, getIsMetaMask } from 'config/web3';
import useAuthenticate from 'hooks/useAuthenticate';
import useCurrentUser from 'hooks/useCurrentUser';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'util/userAgent';
import ConnectionCanceledModal from '../ConnectionCanceledModal';
import DialogContainer from '../DialogContainer';
import {
  InjectedOption,
  InstallMetaMaskOption,
  MetaMaskOption,
} from './InjectedOption';
import { ButtonContainer, Gap, Subtitle } from './styles';
import { ConnectWalletModalProps } from './types';
import { WalletConnectOption } from './WalletConnectOption';

const ConnectWalletModal = (props: ConnectWalletModalProps) => {
  const {
    tryAuthentication,
    isSigning,
    error: authenticateError,
  } = useAuthenticate();
  const { t } = useTranslation('connect-wallet');
  const { user } = useCurrentUser();
  // const [showUnlock, setShowUnlock] = useState(false);
  const [showCanceled, setShowCanceled] = useState(false);
  // const { showModal } = useModal();

  useEffect(() => {
    if (user) {
      // Close modal once user is connected
      props.onClose(null, 'escapeKeyDown');
    }
  }, [props, user]);

  // Show unlock modal when MM stuck due to locked
  // useAsync(async () => {
  //   if (!error) return;

  //   const { code } = error as Error & { code: number };
  //   if (code === -32002) {
  //     const isUnlocked = await window.ethereum?._metamask.isUnlocked();
  //     setShowUnlock(!isUnlocked);
  //   }
  // }, [error]);

  // Canceled modal
  useEffect(() => {
    if (!authenticateError) return;
    const { code } = authenticateError as Error & { code: number };

    if (code === 4001) {
      setShowCanceled(true);
    }
  }, [authenticateError]);

  function getOptions() {
    const isInjected = getIsInjected();
    const isMetaMask = getIsMetaMask();
    const isCoinbaseWallet = getIsCoinbaseWallet();

    const isCoinbaseWalletBrowser = isMobile && isCoinbaseWallet;
    const isMetaMaskBrowser = isMobile && isMetaMask;
    const isInjectedMobileBrowser =
      isCoinbaseWalletBrowser || isMetaMaskBrowser;

    let injectedOption;
    if (!isInjected) {
      if (!isMobile) {
        injectedOption = <InstallMetaMaskOption />;
      }
    } else if (!isCoinbaseWallet) {
      if (isMetaMask) {
        injectedOption = <MetaMaskOption tryActivation={tryAuthentication} />;
      } else {
        injectedOption = <InjectedOption tryActivation={tryAuthentication} />;
      }
    }

    const walletConnectionOption =
      (!isInjectedMobileBrowser && (
        <WalletConnectOption tryActivation={tryAuthentication} />
      )) ??
      null;

    return (
      <>
        {injectedOption}
        {walletConnectionOption}
      </>
    );
  }

  // if (showUnlock) {
  //   return <UnlockMetamaskModal {...props} />;
  // } else
  if (showCanceled) {
    return (
      <ConnectionCanceledModal
        {...props}
        onCancel={() => {
          setShowCanceled(false);
        }}
      />
    );
  }

  return (
    <DialogContainer title={t('title')} {...props}>
      <Gap gap={8} />
      {isSigning ? (
        <>
          <Subtitle variant='body1' weight='regular' color='neutral200'>
            {t('waiting-signature')}
          </Subtitle>
          <Box
            display='flex'
            mt={4}
            alignItems={'center'}
            justifyContent='center'
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <Subtitle variant='body1' weight='regular' color='neutral200'>
            {t('subtitle')}
          </Subtitle>
          <Gap gap={20} />
          <ButtonContainer>{getOptions()}</ButtonContainer>
        </>
      )}
    </DialogContainer>
  );
};

export default ConnectWalletModal;
