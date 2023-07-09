import {
  AccountCircle,
  ChevronRight,
  ExpandLess,
  Menu,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Avatar,
  ZigButton,
  ZigGlobeLanguages,
  ZigPlusIcon,
  ZigTypography,
  ZigUserIcon,
} from '@zignaly-open/ui';
import { useFirstOwnedService } from 'apis/service/use';
import {
  useChangeLocale,
  useCurrentUser,
  useIsAuthenticated,
  useLogout,
} from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_LOGIN,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_WALLET,
} from 'routes';
import theme from 'theme';
import { HELP_URL } from 'util/constants';
import { supportedLanguages } from 'util/i18next';
import { LocalizationLanguages } from 'util/languages';
import socialNetworksLinks from 'util/socialNetworks';
import Enable2FAModal from 'views/Settings/Enable2FAModal';
import UpdatePasswordModal from 'views/Settings/UpdatePasswordModal';
import { NavLink, Networks } from '../ExtraNavigationDropdown/styles';
import { DropdownExchangeAccount } from './atoms';
import DepositModal from '../../../views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';

const drawerWidth = 250;

const ZigDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const logout = useLogout();
  const { t, i18n } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { showModal } = useZModal();
  const service = useFirstOwnedService();
  const { exchanges, email, imageUrl } = useCurrentUser();
  const changeLocale = useChangeLocale();

  const languageMap = supportedLanguages
    ? supportedLanguages.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const handleSelectLanguage = (locale: string) => {
    changeLocale(locale);
    handleDrawerToggle();
  };

  return (
    <>
      <IconButton
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
            keepMounted: true,
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
            flex={1}
          >
            {isAuthenticated ? (
              <>
                <Box
                  sx={{ my: 2 }}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={1.5}
                >
                  {imageUrl ? (
                    <Avatar image={imageUrl} size={'xlarge'} />
                  ) : (
                    <AccountCircle sx={{ width: 55, height: 55 }} />
                  )}
                  <ZigTypography variant='caption'>{email}</ZigTypography>
                </Box>
                {exchanges?.length && <DropdownExchangeAccount />}
              </>
            ) : (
              <Box
                mt={3}
                mb={2}
                display='flex'
                flexDirection='column'
                gap={2}
                onClick={handleDrawerToggle}
              >
                <Link to={ROUTE_LOGIN}>
                  <ZigButton
                    id={'drawer__login'}
                    variant='text'
                    startIcon={
                      <ZigUserIcon
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
                <Link to={ROUTE_SIGNUP}>
                  <ZigButton id={'drawer__signup'} variant='contained'>
                    {t('account-menu.isAuth-button-signUp')}
                  </ZigButton>
                </Link>
              </Box>
            )}
            <Divider />
            <List>
              {isAuthenticated ? (
                <>
                  {isFeatureOn(Features.ZigWallet) && (
                    <ListItem disablePadding onClick={handleDrawerToggle}>
                      <ListItemButton
                        id='drawer__wallet'
                        to={ROUTE_WALLET}
                        component={Link}
                      >
                        <ListItemText
                          primary={t(
                            'account-menu.notAuth-dropdown-link-wallet',
                          )}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}
                  <ListItemButton
                    onClick={() => setSettingsOpen(!settingsOpen)}
                  >
                    <ListItemText
                      primary={t('account-menu.notAuth-dropdown-link-settings')}
                    />
                    {settingsOpen ? <ExpandLess /> : <ChevronRight />}
                  </ListItemButton>
                  <Collapse in={settingsOpen} timeout='auto' unmountOnExit>
                    <List
                      component='div'
                      disablePadding
                      onClick={handleDrawerToggle}
                    >
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
                  {isFeatureOn(Features.Trader) && (
                    <ListItem disablePadding onClick={handleDrawerToggle}>
                      <ListItemButton
                        id='drawer__become-trader'
                        to={ROUTE_BECOME_TRADER}
                        component={Link}
                      >
                        <ListItemText
                          primary={t('navigation-menu.become-trader')}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {service && (
                    <ListItem disablePadding onClick={handleDrawerToggle}>
                      <ListItemButton
                        id='drawer__for-trading'
                        to={generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                          serviceId: service.serviceId?.toString(),
                        })}
                        component={Link}
                      >
                        <ListItemText
                          primary={t('main-menu.dropdown-link-forTrading')}
                        />
                      </ListItemButton>
                    </ListItem>
                  )}
                </>
              ) : (
                <ListItem disablePadding onClick={handleDrawerToggle}>
                  <ListItemButton
                    to={ROUTE_PROFIT_SHARING}
                    component={Link}
                    id='drawer__ps'
                  >
                    <ListItemText
                      primary={t('navigation-menu.profit-sharing')}
                    />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding onClick={handleDrawerToggle}>
                <ListItemButton target='_blank' href={HELP_URL}>
                  <ListItemText
                    primary={t('main-menu.dropdown-link-helpDocs')}
                  />
                </ListItemButton>
              </ListItem>

              {isAuthenticated && (
                <ListItem>
                  <ZigButton
                    id={'account-menu-deposit'}
                    startIcon={<ZigPlusIcon width={10} height={10} />}
                    sx={{ fontWeight: 600, mb: 1 }}
                    variant={'contained'}
                    onClick={() => showModal(DepositModal)}
                  >
                    {t('action:deposit')}
                  </ZigButton>
                </ListItem>
              )}
            </List>

            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setLanguageOpen(!languageOpen)}>
                  <ListItemIcon sx={{ minWidth: '48px' }}>
                    <ZigGlobeLanguages
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
            {isAuthenticated && (
              <ZigButton
                onClick={() => {
                  logout();
                  handleDrawerToggle();
                }}
                variant='outlined'
                sx={{ mx: 4, mY: 1 }}
              >
                {t('account-menu.notAuth-button-logOut')}
              </ZigButton>
            )}
            <ZigTypography mt={2} variant='caption' marginTop='auto'>
              {t('follow-us')}
            </ZigTypography>
            <Box display='flex' justifyContent='center' mt={-1} mb={1}>
              <Networks>
                {socialNetworksLinks.map((socialNetwork, index) => {
                  const IconComponent = socialNetwork.image;
                  return (
                    <NavLink
                      onClick={handleDrawerToggle}
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
