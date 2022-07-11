import {
  IconButton,
  BrandImage,
  UserIcon,
  WalletIcon,
  TextButton,
} from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuthenticate, {
  useLogout,
  useWalletConnect,
} from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Header as ZIGHeader, Button } from 'zignaly-ui';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import { MenuList } from '@mui/material';
import UserBalance from './UserBalance';
import TransferZigModal from 'components/Modals/TransferZig';

const StyledWalletIcon = styled(WalletIcon)`
  color: ${({ theme }) => theme.neutral300};
`;

const MenuItem = styled(TextButton)`
  padding: 2px 15px;
  color: ${({ theme }) => theme.neutral200};
  display: block;

  span {
    font-size: 15px !important;
  }
`;

const Menu = () => {
  const { t } = useTranslation('global');
  const logout = useLogout();

  return (
    <MenuList>
      <MenuItem color='neutral200' caption={t('settings')} onClick={() => {}} />
      <MenuItem color='neutral200' caption={t('disconnect')} onClick={logout} />
    </MenuList>
  );
};

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  const authenticate = useAuthenticate();
  const { user: currentUser, loading } = useCurrentUser();
  const walletConnect = useWalletConnect();
  const { showModal } = useModal();

  return (
    <>
      <ZIGHeader
        leftElements={[
          <BrandImage
            key={'logo2'}
            type={'logotype'}
            width={'140px'}
            height={'68px'}
          />,
        ]}
        rightElements={[
          !loading &&
            (currentUser?.id ? (
              <>
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('transfer-coin', { coin: 'ZIG' })}
                  leftElement={<StyledWalletIcon />}
                  onClick={() => showModal(TransferZigModal)}
                />
                <UserBalance />
              </>
            ) : (
              <TextButton
                onClick={() => {
                  showModal(ConnectWalletModal, {
                    metaMaskOnClick: authenticate,
                    walletConnectOnClick: walletConnect,
                  });
                }}
                caption={t('log-in')}
              />
            )),
          <IconButton
            key={'user'}
            variant={'flat'}
            // @ts-ignore
            icon={<UserIcon color='#65647E' />}
            renderDropDown={<Menu />}
            dropDownOptions={{
              alignment: 'right',
              position: 'static',
            }}
          />,
        ]}
      />
    </>
  );
};

export default Header;
