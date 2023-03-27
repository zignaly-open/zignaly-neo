import {
  Header as ZigHeader,
  HeaderLinksContainer,
  BrandImage,
  MarginContainer,
} from '@zignaly-open/ui';
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
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import theme from 'theme';
import { Menu } from '@mui/icons-material';
import { Container, StyledAppBar } from './styles';
import Drawer from '../Drawer';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const md = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar component='nav'>
        <Toolbar sx={{ flex: 1 }}>
          <Container>
            {md ? (
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
                  <NavigationLink
                    id='menu__become-trader'
                    to={ROUTE_BECOME_TRADER}
                    key='--route-bt'
                  >
                    {t('navigation-menu.become-trader')}
                  </NavigationLink>
                </HeaderLinksContainer>
                <ExtraNavigationDropdown />
              </Box>
            ) : (
              <Drawer />
            )}
            {/* <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography> */}
            {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */}
            <Box
              display='flex'
              gap='28px'
              sx={{
                // Center balance widget on mobile
                ...(isAuthenticated &&
                  !md && { flex: 1, justifyContent: 'center' }),
              }}
            >
              {isAuthenticated && (
                <>
                  <BalanceButton key={'balance'} />
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

  return (
    <ZigHeader
      leftElements={[
        <Link to={ROUTE_DASHBOARD} key='logo'>
          <BrandImage
            id='menu__logo-portfolio'
            height='32px'
            type='isotype'
            width='32px'
          />
        </Link>,
        <HeaderLinksContainer key='links'>
          <NavigationLink
            id='menu__marketplace'
            to={ROUTE_PROFIT_SHARING}
            key='--route-ps'
          >
            {t('navigation-menu.profit-sharing')}
          </NavigationLink>
          <NavigationLink
            id='menu__become-trader'
            to={ROUTE_BECOME_TRADER}
            key='--route-bt'
          >
            {t('navigation-menu.become-trader')}
          </NavigationLink>
        </HeaderLinksContainer>,
        <ExtraNavigationDropdown key={'extra-nav'} />,
      ]}
      rightElements={[
        isAuthenticated && md && <BalanceButton key={'balance'} />,
        isAuthenticated && md && <ReferralButton key={'referral'} />,
        <AccountMenu key={'account'} />,
      ].filter(Boolean)}
    />
  );
};

export default Header;
export { HeaderLinksContainer };
