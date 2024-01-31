import { BrandImage, HeaderLinksContainer } from '@zignaly-open/ui';
import React, { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
} from '../../../routes';
import ExtraNavigationDropdown from '../ExtraNavigationDropdown';
import AccountMenu from '../AccountMenu';
import { useIsAuthenticated } from '../../../apis/user/use';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import theme from 'theme';
import { Container, StyledAppBar } from './styles';
import Drawer from '../Drawer';
import HeaderWidgetButtons from '../HeaderWidgetButtons';
import { isFeatureOn, whitelabel } from '../../../whitelabel';
import { Features } from 'whitelabel/type';

type HeaderMenuItem = {
  id: string;
  to: string;
  key: string;
  text: string;
};

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const logoRoute = whitelabel.links?.mainAppLink || ROUTE_DASHBOARD;

  const logo = whitelabel.logo ? (
    <img src={whitelabel.logo} id='menu__logo' height='32' />
  ) : (
    <BrandImage id='menu__logo' height='32px' type='isotype' width='32px' />
  );

  const navigationLinks = useMemo<HeaderMenuItem[]>(() => {
    const menuItems: HeaderMenuItem[] = [];
    if (!isFeatureOn(Features.LoginOnlyAccess) || isAuthenticated) {
      menuItems.push({
        id: 'menu__marketplace',
        to: ROUTE_PROFIT_SHARING,
        key: '--route-ps',
        text: t('navigation-menu.profit-sharing'),
      });
    }

    if (md && isFeatureOn(Features.CreateService)) {
      menuItems.push({
        id: 'menu__become-trader',
        to: ROUTE_BECOME_TRADER,
        key: '--route-bt',
        text: t('navigation-menu.become-trader'),
      });
    }
    return menuItems;
  }, [t, isAuthenticated, md]);

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar>
        <Toolbar sx={{ flex: 1 }}>
          <Container>
            {sm ? (
              <Box display='flex' alignItems='center' gap='28px'>
                {!logoRoute.startsWith('http') ? (
                  <NavigationLink
                    id='menu__logo'
                    style={{ display: 'flex' }}
                    to={logoRoute}
                    key='--route-main'
                  >
                    {logo}
                  </NavigationLink>
                ) : (
                  <a
                    style={{ display: 'flex' }}
                    href={logoRoute}
                    key='logo'
                    rel={'noopener'}
                  >
                    {logo}
                  </a>
                )}
                {!!navigationLinks.length && (
                  <HeaderLinksContainer key='links'>
                    {navigationLinks.map(({ id, to, key, text }) => (
                      <NavigationLink id={id} to={to} key={key}>
                        {text}
                      </NavigationLink>
                    ))}
                  </HeaderLinksContainer>
                )}
                <ExtraNavigationDropdown />
              </Box>
            ) : (
              <Drawer />
            )}
            <Box
              alignItems='center'
              display='flex'
              gap='28px'
              sx={{
                // Center balance widget on mobile
                ...(isAuthenticated &&
                  !sm && { flex: 1, justifyContent: 'center' }),
              }}
            >
              <Suspense>
                {isAuthenticated && <HeaderWidgetButtons />}
                <AccountMenu />
              </Suspense>
            </Box>
          </Container>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
export { HeaderLinksContainer };
