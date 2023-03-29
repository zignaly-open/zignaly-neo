import { HeaderLinksContainer, BrandImage } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
} from '../../../routes';
import { Link } from 'react-router-dom';
import ExtraNavigationDropdown from '../ExtraNavigationDropdown';
import AccountMenu from '../AccountMenu';
import ReferralButton from '../ReferralButton';
import { useIsAuthenticated } from '../../../apis/user/use';
import BalanceButton from '../BalanceButton';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import theme from 'theme';
import RewardsButton from '../RewardsButton';
import { Container, StyledAppBar } from './styles';
import Drawer from '../Drawer';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar>
        <Toolbar sx={{ flex: 1 }}>
          <Container>
            {sm ? (
              <Box display='flex' alignItems='center' gap='28px'>
                <Link to={ROUTE_DASHBOARD} key='logo'>
                  <BrandImage
                    id='menu__logo-portfolio'
                    height='32px'
                    type='isotype'
                    width='32px'
                  />
                </Link>
                <HeaderLinksContainer key='links'>
                  <NavigationLink
                    id='menu__marketplace'
                    to={ROUTE_PROFIT_SHARING}
                    key='--route-ps'
                  >
                    {t('navigation-menu.profit-sharing')}
                  </NavigationLink>
                  {md && (
                    <NavigationLink
                      id='menu__become-trader'
                      to={ROUTE_BECOME_TRADER}
                      key='--route-bt'
                    >
                      {t('navigation-menu.become-trader')}
                    </NavigationLink>
                  )}
                </HeaderLinksContainer>
                <ExtraNavigationDropdown />
              </Box>
            ) : (
              <Drawer />
            )}
            <Box
              display='flex'
              gap='28px'
              sx={{
                // Center balance widget on mobile
                ...(isAuthenticated &&
                  !sm && { flex: 1, justifyContent: 'center' }),
              }}
            >
              {isAuthenticated && (
                <>
                  <BalanceButton key={'balance'} />
                  {md && <RewardsButton key={'rewards'} />}
                  {md && <ReferralButton key={'referral'} />}
                </>
              )}
              <AccountMenu />
            </Box>
          </Container>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
export { HeaderLinksContainer };
