import React, { useEffect } from 'react';
import { People, Redeem } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
  BrandImage,
  Button,
  DropDown,
  Header as ZIGHeader,
  IconButton,
  UserIcon,
  WalletIcon,
} from '@zignaly-open/ui';
import RedeemCodeModal from 'components/Modals/RedeemCode';
import ShareCodeModal from 'components/Modals/ShareCode';
import SwitchAccountModal from 'components/Modals/SwitchAccount';
import TransferZigModal from 'components/Modals/TransferZig';
import { useLogout } from 'hooks/useAuthenticate';
import { useModal } from 'mui-modal-provider';
import { useTranslation } from 'react-i18next';
import { theme } from 'theme';
import { getToken } from 'util/token';
import { triggerTz } from 'util/tz';
import useCurrentUser from '../../hooks/useCurrentUser';
import ConnectWalletModal from '../Modals/ConnectWallet';
import UserSettingsModal from '../Modals/UserSettings';
import UserBalance from './UserBalance';
import { useWeb3React } from '@web3-react/core';
import SwitchNetworkContainer from './SwitchNetwork';

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
  const { loading, user: currentUser } = useCurrentUser();
  const { showModal } = useModal();
  const { account } = useWeb3React();
  const logout = useLogout();
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const href = window.location.href;
  // Url tracking
  // Todo: extract to separate hook
  const token = getToken();

  useEffect(() => {
    // Avoid making an unnecessary request if user id is loading
    if (!token || currentUser?.id) {
      triggerTz(href, null, currentUser?.publicAddress);
    }
  }, [href, currentUser, token]);

  useEffect(() => {
    if (currentUser) {
      if (
        account !== undefined &&
        account?.toLowerCase() !== currentUser?.publicAddress.toLowerCase()
      ) {
        // User changed MM account, ask to disconnect.
        showModal(SwitchAccountModal);
      }
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
                  display: { sm: 'flex', xs: 'none' },
                }}
                gap='28px'
              >
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('share-earn')}
                  leftElement={<StyledPeopleIcon />}
                  onClick={() => showModal(ShareCodeModal)}
                />
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('redeem-code')}
                  leftElement={<StyledRedeemIcon />}
                  onClick={() => showModal(RedeemCodeModal)}
                />
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
              <SwitchNetworkContainer />

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
