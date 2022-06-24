import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { IconButton, BrandImage, UserIcon } from 'zignaly-ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthenticate, { useLogout } from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import UserBalance from './UserBalance';
import UserBalanceListener from './UserBalanceListener';
import { Header as ZIGHeader, ZigsBalance } from 'zignaly-ui';
import Navigation from './Navigation';
import useBalance from '../../hooks/useBalance';

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const authenticate = useAuthenticate();
  const logout = useLogout();
  const { user: currentUser, loading } = useCurrentUser();
  const { balance } = useBalance();

  return (
    <>
      <ZIGHeader
        leftElements={[
          // <BrandImage
          //   key={'logo'}
          //   type={'isotype'}
          //   width={'32px'}
          //   height={'32px'}
          // />,
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
              <>
                <ZigsBalance key={'balance'} balance={balance} />
                <UserBalanceListener />
              </>
            ) : (
              <Button variant={'text'} onClick={authenticate}>
                {t('log-in')}
              </Button>
            )),
          <IconButton
            key={'user'}
            variant={'flat'}
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
