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

const StyledLogo = styled(Typography)`
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
    0.025em 0.04em 0 #fffc00;
  animation: glitch 725ms infinite;

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
        0.025em 0.04em 0 #fffc00;
    }
    15% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
        0.025em 0.04em 0 #fffc00;
    }
    16% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
        -0.05em -0.05em 0 #fffc00;
    }
    49% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
        -0.05em -0.05em 0 #fffc00;
    }
    50% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
        0 -0.04em 0 #fffc00;
    }
    99% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
        0 -0.04em 0 #fffc00;
    }
    100% {
      text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
        -0.04em -0.025em 0 #fffc00;
    }
  }
`;
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
      <StyledLogo
        fontSize={{
          sm: 20,
          md: 48,
          lg: 72,
        }}
        lineHeight={1}
        marginTop={2}
        textAlign='center'
        fontWeight={600}
      >
        {t('logo')}
        {/*https://codepen.io/cbanlawi/pen/xxRBeMY*/}
      </StyledLogo>
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
