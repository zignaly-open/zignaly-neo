import { BrandImage, HeaderLinksContainer } from '@zignaly-open/ui';
import React from 'react';
import { NavigationLink } from './atoms';
import { Box, Toolbar } from '@mui/material';
import { Container, StyledAppBar } from './styles';
import { ROUTE_USERS } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';
import { useTranslation } from 'react-i18next';

const BackofficeHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
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
                    <NavigationLink
                      id='menu__marketplace'
                      to={ROUTE_USERS}
                      key='--route-ps'
                    >
                      {t('navigation.users')}
                    </NavigationLink>
                  </>
                ) : (
                  <NavigationLink
                    id='menu__marketplace'
                    to={ROUTE_USERS}
                    key='--route-ps'
                  >
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
