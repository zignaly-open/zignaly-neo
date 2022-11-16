import {
  IconButton,
  BrandImage,
  UserIcon,
  WalletIcon,
  DropDown,
} from '@zignaly-open/ui';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Header as ZIGHeader, Button } from '@zignaly-open/ui';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import UserBalance from './UserBalance';
import TransferZigModal from 'components/Modals/TransferZig';
import ShareCodeModal from 'components/Modals/ShareCode';
import RedeemCodeModal from 'components/Modals/RedeemCode';
import SwitchAccountModal from 'components/Modals/SwitchAccount';
import { Box } from '@mui/system';
import { useEthers } from '@usedapp/core';
import { useLogout } from 'hooks/useAuthenticate';
import { UserType } from '@zignaly-open/raffles-shared/types';
import UserSettingsModal from '../Modals/UserSettings';
import { useMediaQuery } from '@mui/material';
import theme from 'theme';
import { People, Redeem } from '@mui/icons-material';
import { triggerTz, useTz } from 'util/tz';
import { getToken } from 'util/token';

const StyledPeopleIcon = styled(People)`
  color: ${(props) => props.theme.neutral200};
`;

const StyledWalletIcon = styled(WalletIcon)`
  color: ${(props) => props.theme.neutral200};
`;

const StyledRedeemIcon = styled(Redeem)`
  color: ${(props) => props.theme.neutral200};
`;

const StickyHeader = styled(ZIGHeader)`
  position: sticky !important;
  margin: -8px;
`;

const MenuButton = styled(IconButton)`
  ${(props) => props.theme.breakpoints.down('sm')} {
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
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const track = useTz();

  const href = window.location.href;

  // Url tracking
  // Todo: extract to separate hook
  const token = getToken();
  useEffect(() => {
    // Avoid making an unnecessary request if user id is loading
    if (!token || currentUser?.id) {
      triggerTz(href, currentUser?.publicAddress);
    }
  }, [href, currentUser, token]);

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
                  display: { sm: 'flex', xs: 'none' },
                }}
                gap='28px'
              >
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('share-earn')}
                  leftElement={<StyledPeopleIcon />}
                  onClick={() => {
                    track('share');
                    showModal(ShareCodeModal);
                  }}
                />
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('redeem-code')}
                  leftElement={<StyledRedeemIcon />}
                  onClick={() => {
                    track('redeem');
                    showModal(RedeemCodeModal);
                  }}
                />
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('transfer-coin', { coin: 'ZIG' })}
                  leftElement={<StyledWalletIcon />}
                  onClick={() => {
                    track('transfer');
                    showModal(TransferZigModal);
                  }}
                />
              </Box>
              <Box ml={{ sm: 0, xs: 1 }}>
                <UserBalance />
              </Box>
              <DropDown
                options={[
                  {
                    show: matchesSmall,
                    label: t('transfer-coin', { coin: 'ZIG' }),
                    onClick: () => showModal(TransferZigModal),
                  },
                  {
                    label: t('settings'),
                    onClick: () => showModal(UserSettingsModal),
                  },
                  {
                    show: matchesSmall,
                    label: t('redeem-code'),
                    onClick: () => showModal(RedeemCodeModal),
                  },
                  {
                    show: matchesSmall,
                    label: t('share-earn'),
                    onClick: () => showModal(ShareCodeModal),
                  },
                  {
                    label: t('disconnect'),
                    onClick: logout,
                  },
                ].filter((x) => x.show !== false)}
                component={() => (
                  <MenuButton
                    size={'xlarge'}
                    key={'user'}
                    variant={'flat'}
                    icon={<UserIcon color='#65647E' />}
                  />
                )}
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
