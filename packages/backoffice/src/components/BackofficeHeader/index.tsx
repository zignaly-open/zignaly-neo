import { BrandImage, HeaderLinksContainer } from '@zignaly-open/ui';
import React from 'react';
import { NavigationLink } from './atoms';
import { Box, Toolbar } from '@mui/material';
import { Container, StyledAppBar } from './styles';
import { ROUTE_LOGIN, ROUTE_TRANSACTIONS, ROUTE_USERS } from '../../routes';
import { useIsAuthenticated, useLogout } from '../../apis/user/use';
import { useTranslation } from 'react-i18next';

const BackofficeHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar>
        <Toolbar sx={{ flex: 1 }}>
          <Container>
            <Box display='flex' alignItems='center' gap='28px'>
              <NavigationLink
                id='menu__logo'
                style={{ display: 'flex' }}
                to={ROUTE_USERS}
                key='--route-main'
              >
                <BrandImage
                  id='menu__logo'
                  height='32px'
                  type='isotype'
                  width='32px'
                />
              </NavigationLink>

              <HeaderLinksContainer key='links'>
                {isAuthenticated ? (
                  <>
                    <NavigationLink to={ROUTE_USERS} key='--route-users'>
                      {t('navigation.users')}
                    </NavigationLink>
                    <NavigationLink to={ROUTE_TRANSACTIONS} key='--route-users'>
                      {t('navigation.transactions')}
                    </NavigationLink>
                    <a
                      id='logout'
                      onClick={() => logout()}
                      key='--route-logout'
                    >
                      {t('navigation.logout')}
                    </a>
                  </>
                ) : (
                  <NavigationLink to={ROUTE_LOGIN} key='--route-ps'>
                    {t('navigation.login')}
                  </NavigationLink>
                )}
              </HeaderLinksContainer>
            </Box>
          </Container>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default BackofficeHeader;
