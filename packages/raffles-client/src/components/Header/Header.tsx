import { IconButton, BrandImage, UserIcon, WalletIcon } from '@zignaly-open/ui';
import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!account && currentUser) {
      // Disconnected from MM
      logout();
    } else if (
      account &&
      currentUser &&
      account.toLowerCase() !== currentUser.publicAddress.toLowerCase()
    ) {
      // User changed MM account, ask to disconnect
      showModal(SwitchAccountModal);
    }
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
                key={'user'}
                variant={'flat'}
                icon={<UserIcon color='#65647E' />}
                renderDropDown={
                  <Menu showModal={showModal} currentUser={currentUser} />
                }
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
