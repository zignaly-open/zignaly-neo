import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthenticate, { useLogout } from '../../hooks/useAuthenticate';
import useCurrentUser from '../../hooks/useCurrentUser';
import UserBalance from './UserBalance';
import UserBalanceListener from './UserBalanceListener';
import Logo from './Logo';

const StyledMoto = styled(Typography)`
  text-transform: uppercase;
  text-shadow: 0 0 1px #fff;
`;

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const authenticate = useAuthenticate();
  const logout = useLogout();
  const { user: currentUser, loading } = useCurrentUser();

  return (
    <>
      <Logo />

      <StyledMoto
        fontSize={{
          sm: 11,
          md: 12,
          lg: 13,
        }}
        textAlign={'center'}
        variant={'subtitle1'}
        color={'secondary'}
      >
        {t('moto')}
      </StyledMoto>

      <Box textAlign={'center'} marginTop={3} marginBottom={1}>
        <Button variant={'text'} onClick={() => navigate('/')}>
          {t('home')}
        </Button>
        <Button variant={'text'} onClick={() => navigate('/how-it-works')}>
          {t('how-it-works')}
        </Button>
        {/*<Button variant={'text'} onClick={() => navigate('/')}>*/}
        {/*  {t('view-history')}*/}
        {/*</Button>*/}
        {!loading &&
          (!currentUser?.id ? (
            <Button variant={'text'} onClick={authenticate}>
              {t('log-in')}
            </Button>
          ) : (
            <>
              <Button variant={'text'} onClick={() => navigate('/deposit')}>
                {t('buy-bids')}
              </Button>
              <Button variant={'text'} onClick={() => navigate('/profile')}>
                {t('edit profile')}
              </Button>
              <Button variant={'text'} onClick={logout}>
                {t('log-out')}
              </Button>
            </>
          ))}
      </Box>

      {!loading && !!currentUser?.id && (
        <Box textAlign={'center'} marginBottom={3}>
          <UserBalance />
          <UserBalanceListener />
        </Box>
      )}
    </>
  );
};

export default Header;
