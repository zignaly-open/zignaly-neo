import {
  AccountCircle,
  CardGiftcardOutlined,
  ChevronRight,
  CurrencyBitcoinOutlined,
  ExpandLess,
  ExpandMore,
  GifOutlined,
  Menu,
  StarBorder,
  Storefront,
  WorkOutline,
} from '@mui/icons-material';
import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Box,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  Button,
  Collapse,
  ListItemIcon,
  ListSubheader,
} from '@mui/material';
import {
  Avatar,
  DropDown,
  UserIcon,
  ZigButton,
  ZigTypography,
  IconButton as ZigIconButton,
  GlobeLanguages,
} from '@zignaly-open/ui';
import { useFirstOwnedService, useTraderServices } from 'apis/service/use';
import {
  useActiveExchange,
  useCurrentUser,
  useIsAuthenticated,
  useLogout,
  useSelectExchange,
} from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import {
  ROUTE_PROFIT_SHARING,
  ROUTE_DASHBOARD,
  ROUTE_REFERRALS,
  ROUTE_MY_BALANCES,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_BECOME_TRADER,
} from 'routes';
import theme from 'theme';
import { HELP_URL } from 'util/constants';
import { supportedLanguages } from 'util/i18next';
import { getImageOfAccount } from 'util/images';
import { LocalizationLanguages } from 'util/languages';
import socialNetworksLinks from 'util/socialNetworks';
import Enable2FAModal from 'views/Settings/Enable2FAModal';
import UpdatePasswordModal from 'views/Settings/UpdatePasswordModal';
import { AccountName, LoginButton } from '../AccountMenu/styles';
import { NavLink, Networks } from '../ExtraNavigationDropdown/styles';
import { NavigationLink } from '../Header/atoms';
import { AccountDropdown } from './styles';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const ZigDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const logout = useLogout();
  const { t, i18n } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { showModal } = useZModal();
  const { data: traderServices, isFetching } = useTraderServices();
  const service = useFirstOwnedService();
  const activeExchange = useActiveExchange();
  const { exchanges, email, imageUrl } = useCurrentUser();

  const selectExchange = useSelectExchange();

  const handleClick = () => {
    setOpen(!open);
  };

  const languageMap = supportedLanguages
    ? supportedLanguages.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const onSelectLocale = (locale: string) => {
    changeLocale(locale);
    onClose();
  };

  const handleSelectLanguage = (locale: string) => {
    onSelectLocale(locale);
  };

  const setActiveExchange = (exchangeInternalId: string) => {
    selectExchange(exchangeInternalId);
  };
  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <Menu />
      </IconButton>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            textAlign='center'
            gap={2}
            justifyContent='center'
          >
            {isAuthenticated && (
              <>
                <Box
                  sx={{ my: 2 }}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={2}
                >
                  {imageUrl ? (
                    <Avatar image={imageUrl} size={'large'} />
                  ) : (
                    <AccountCircle />
                  )}
                  <ZigTypography variant='h6'>{email}</ZigTypography>
                </Box>
                <DropDown
                  component={({ open }) => (
                    <AccountDropdown>
                      <Avatar size={'medium'} image={activeExchange?.image} />
                      <AccountName variant={'body1'} color={'neutral100'}>
                        {activeExchange?.internalName}
                      </AccountName>
                      {open ? <ExpandLess /> : <ChevronRight />}
                    </AccountDropdown>
                  )}
                  options={(exchanges?.length > 1 ? exchanges : []).map(
                    (exchange, index) => ({
                      onClick: () => setActiveExchange(exchange.internalId),
                      id: `account-switcher-dropdown__account-${index}`,
                      label: (
                        <>
                          <Avatar
                            size={'medium'}
                            image={getImageOfAccount(index)}
                          />
                          <AccountName
                            variant={'body1'}
                            color={
                              activeExchange?.internalId === exchange.internalId
                                ? 'highlighted'
                                : 'neutral200'
                            }
                          >
                            {exchange.internalName}
                          </AccountName>
                        </>
                      ),
                    }),
                  )}
                />
                <Divider />
              </>
            )}
            <List>
              {isAuthenticated && (
                <>
                  {/* <ListItemButton>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText primary='Sent mail' />
                    </ListItemButton> */}
                  {/* <ListItemButton>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary='Drafts' />
                    </ListItemButton> */}
                  <ListItemButton onClick={handleClick}>
                    {/* <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon> */}
                    <ListItemText
                      primary={t('account-menu.notAuth-dropdown-link-settings')}
                    />
                    {open ? <ExpandLess /> : <ChevronRight />}
                  </ListItemButton>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => showModal(UpdatePasswordModal)}
                      >
                        <ListItemText
                          primary={t(
                            'account-menu.notAuth-dropdown-link-password',
                          )}
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => showModal(Enable2FAModal)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={t('account-menu.notAuth-dropdown-link-2fa')}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItem disablePadding>
                    <ListItemButton
                      target='_blank'
                      href={ROUTE_BECOME_TRADER}
                      id='drawer__become-trader'
                    >
                      <ListItemText
                        primary={t('navigation-menu.become-trader')}
                      />
                    </ListItemButton>
                  </ListItem>
                  {service && (
                    <ListItem disablePadding>
                      <ListItemButton
                        target='_blank'
                        href={generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                          serviceId: service.serviceId?.toString(),
                        })}
                        id='drawer__for-trading'
                      >
                        <ListItemText
                          primary={t('main-menu.dropdown-link-forTrading')}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}
                </>
              )}
              <ListItem disablePadding>
                <ListItemButton target='_blank' href={HELP_URL}>
                  <ListItemText
                    primary={t('main-menu.dropdown-link-helpDocs')}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            {isAuthenticated ? (
              <ZigButton
                onClick={() => {
                  logout();
                  handleClick();
                }}
              >
                {t('account-menu.notAuth-button-logOut')}
              </ZigButton>
            ) : (
              <>
                <Link to={ROUTE_LOGIN} state={{ redirectTo: location }}>
                  <ZigButton
                    id={'drawer__login'}
                    variant='text'
                    startIcon={
                      <UserIcon
                        color={theme.palette.neutral300}
                        width={'16px'}
                        height={'16px'}
                      />
                    }
                    color={'secondary'}
                  >
                    {t('account-menu.isAuth-button-logIn')}
                  </ZigButton>
                </Link>
                <Link to={ROUTE_SIGNUP} state={{ redirectTo: location }}>
                  <ZigButton id={'drawer__signup'} variant='contained'>
                    {t('account-menu.isAuth-button-signUp')}
                  </ZigButton>
                </Link>
              </>
            )}
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setLanguageOpen(!languageOpen)}>
                  <ListItemIcon sx={{ minWidth: '48px' }}>
                    <GlobeLanguages
                      color={theme.palette.neutral300}
                      width={'26px'}
                      height={'26px'}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      LocalizationLanguages[i18n.language?.split('_')[0]]?.label
                    }
                  />

                  {languageOpen ? <ExpandLess /> : <ChevronRight />}
                </ListItemButton>
              </ListItem>
              <Collapse in={languageOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {languageMap.map((language, index) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={language.locale}
                      onClick={() => handleSelectLanguage(language.locale)}
                      id={`drawer-languages__${index.toString()}`}
                    >
                      <ListItemText primary={language.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
            <ZigTypography mt={2} variant='caption'>
              {t('follow-us')}
            </ZigTypography>
            <Box display='flex' justifyContent='center' mt={-1}>
              <Networks>
                {socialNetworksLinks.map((socialNetwork, index) => {
                  const IconComponent = socialNetwork.image;
                  return (
                    <NavLink
                      onClick={handleClick}
                      href={socialNetwork.path}
                      key={`--social-network-nav-link-${index.toString()}`}
                      id={`drawer__social-network-${index.toString()}`}
                      target={'_blank'}
                    >
                      <IconComponent height={'22px'} width={'22px'} />
                    </NavLink>
                  );
                })}
              </Networks>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default ZigDrawer;
