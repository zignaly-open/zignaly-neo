import { IconButton, BrandImage, UserIcon, WalletIcon } from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuthenticate, { useWalletConnect } from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Header as ZIGHeader, Button } from 'zignaly-ui';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import UserBalance from './UserBalance';
import TransferZigModal from 'components/Modals/TransferZig';
import Menu from './Menu';

// @ts-ignore: fixme
const StyledWalletIcon = styled(WalletIcon)`
  color: ${({ theme }) => theme.neutral300};
`;

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
              <React.Fragment key='transfer'>
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('transfer-coin', { coin: 'ZIG' })}
                  leftElement={<StyledWalletIcon />}
                  onClick={() => showModal(TransferZigModal)}
                />
                <UserBalance />
              </React.Fragment>
            ) : (
              <Button
                variant='secondary'
                size='small'
                onClick={() => {
                  showModal(ConnectWalletModal, {
                    metaMaskOnClick: authenticate,
                    walletConnectOnClick: walletConnect,
                  });
                }}
                caption={t('log-in')}
                key='login'
                leftElement={<StyledWalletIcon />}
              />
            )),
          <IconButton
            key={'user'}
            variant={'flat'}
            // @ts-ignore
            icon={<UserIcon color='#65647E' />}
            renderDropDown={
              <Menu showModal={showModal} currentUser={currentUser} />
            }
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
