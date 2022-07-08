import {
  IconButton,
  BrandImage,
  UserIcon,
  Select,
  WalletIcon,
  TextButton,
} from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuthenticate, {
  useWalletConnect /*, { useLogout }*/,
} from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import UserBalanceListener from './UserBalanceListener';
import { Header as ZIGHeader, ZigsBalance, Button } from 'zignaly-ui';
import Navigation from './Navigation';
import useBalance from '../../hooks/useBalance';
import { ethers } from 'ethers';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import TransferZigModal from 'components/Modals/TransferZig';

const DepositSelect = styled(Select)`
  width: auto;

  > div {
    > span {
      color: ${({ theme }) => theme.highlighted};
    }
    padding: 0 !important;
  }
`;

const Balance = styled(ZigsBalance)`
  height: 30px;
`;

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  const authenticate = useAuthenticate();
  // const logout = useLogout();
  const { user: currentUser, loading } = useCurrentUser();
  const { balance } = useBalance();
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
          <Navigation
            key={'navigation'}
            routes={[
              {
                path: '/',
                label: 'Home',
                isActive: true,
              },
              ...(!loading && currentUser?.id
                ? [
                    {
                      path: '/deposit',
                      label: t('buy-bids'),
                    },
                  ]
                : []),
            ]}
          />,
        ]}
        rightElements={[
          !loading &&
            (currentUser?.id ? (
              <React.Fragment key={'balance'}>
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('insert-code')}
                  onClick={() => showModal(TransferZigModal)}
                />
                <Balance
                  balance={ethers.utils.parseEther(balance.toString())}
                />
                <UserBalanceListener />
                <DepositSelect
                  placeholder={
                    <Box display='flex' gap='8px' marginLeft='10px'>
                      <WalletIcon />
                      {t('deposit')}
                    </Box>
                  }
                  options={[
                    {
                      caption: t('deposit'),
                    },
                    {
                      caption: t('disconnect'),
                    },
                  ]}
                  onChange={() => {}}
                />
              </React.Fragment>
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
            renderDropDown={<div>{t('settings')}</div>}
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
