import { Button } from '@mui/material';
import { IconButton, BrandImage, UserIcon } from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuthenticate /*, { useLogout }*/ from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import UserBalanceListener from './UserBalanceListener';
import { Header as ZIGHeader, ZigsBalance } from 'zignaly-ui';
import Navigation from './Navigation';
import useBalance from '../../hooks/useBalance';
import { ethers } from 'ethers';

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  const authenticate = useAuthenticate();
  // const logout = useLogout();
  const { user: currentUser, loading } = useCurrentUser();
  const { balance } = useBalance();

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
              {
                path: '/how-it-works',
                label: t('how-it-works'),
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
                <ZigsBalance
                  balance={ethers.utils.parseEther(balance.toString())}
                />
                <UserBalanceListener />
              </React.Fragment>
            ) : (
              <Button variant={'text'} onClick={authenticate}>
                {t('log-in')}
              </Button>
            )),
          <IconButton
            key={'user'}
            variant={'flat'}
            // @ts-ignore
            icon={<UserIcon color='#65647E' />}
            renderDropDown={<div>DropDown Container</div>}
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
