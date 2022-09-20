import { IconButton, BrandImage, UserIcon, WalletIcon } from '@zignaly-open/ui';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Header as ZIGHeader, Button } from '@zignaly-open/ui';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import UserBalance from './UserBalance';
import TransferZigModal from 'components/Modals/TransferZig';
import SwitchAccountModal from 'components/Modals/SwitchAccount';
import Menu from './Menu';
import { Box } from '@mui/system';
import { useEthers } from '@usedapp/core';
import { useLogout } from 'hooks/useAuthenticate';
import { UserType } from '@zignaly-open/raffles-shared/types';

const StyledWalletIcon = styled(WalletIcon)`
  color: ${({ theme }) => theme.neutral300};
`;

const StickyHeader = styled(ZIGHeader)`
  position: sticky !important;
  margin: -8px;
`;

const MenuButton = styled(IconButton)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: -18px;
  }
  button > div {
    width: auto !important;
  }
`;

const Header = () => {
  const { t } = useTranslation('global');
  const { user: currentUser, loading } = useCurrentUser();
  const { showModal } = useModal();
  const { account } = useEthers();
  const logout = useLogout();
  const userRef = useRef<UserType>();

  useEffect(() => {
    if (currentUser) {
      if (
        account &&
        account.toLowerCase() !== currentUser.publicAddress.toLowerCase()
      ) {
        // User changed MM account, ask to disconnect.
        showModal(SwitchAccountModal);
      }
    } else if (userRef.current) {
      // Disconnected manually from MM.
      logout();
    }

    // Save user to avoid detecting false disconnection because "account" wasn't yet loaded at page load.
    userRef.current = currentUser;
  }, [account, currentUser]);

  return (
    <StickyHeader
      leftElements={[
        <BrandImage
          key={'logo2'}
          type={'zigbidslogotype'}
          width={'140px'}
          height={'68px'}
        />,
      ]}
      rightElements={[
        !loading &&
          (currentUser?.id ? (
            <React.Fragment key='transfer'>
              <Box
                sx={{
                  display: { sm: 'block', xs: 'none' },
                }}
              >
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('transfer-coin', { coin: 'ZIG' })}
                  leftElement={<StyledWalletIcon />}
                  onClick={() => showModal(TransferZigModal)}
                />
              </Box>
              <Box ml={{ sm: 0, xs: 1 }}>
                <UserBalance />
              </Box>
              <MenuButton
                size={'large'}
                key={'user'}
                variant={'flat'}
                icon={<UserIcon color='#65647E' />}
                renderDropDown={
                  <Menu showModal={showModal} currentUser={currentUser} />
                }
                dropDownOptions={{
                  alignment: 'right',
                  position: 'static',
                }}
              />
            </React.Fragment>
          ) : (
            <Button
              variant='secondary'
              size='small'
              onClick={() => {
                showModal(ConnectWalletModal);
              }}
              caption={t('log-in')}
              key='login'
              leftElement={<StyledWalletIcon />}
            />
          )),
      ]}
    />
  );
};

export default Header;
