import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LoginButton,
  AccountDropdown,
  LogoutButtonWrap,
  AccountName,
} from './styles';
import { useTheme } from '@mui/material';
import {
  useActiveExchange,
  useCurrentUser,
  useIsAuthenticated,
  useLogout,
  useSelectExchange,
} from '../../../apis/user/use';
import {
  Avatar,
  Button,
  DropDown,
  IconButton,
  Typography,
  UserIcon,
} from '@zignaly-open/ui';
import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_MY_BALANCES,
  ROUTE_WALLET,
} from '../../../routes';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { getImageOfAccount } from '../../../util/images';

function AccountMenu(): React.ReactElement | null {
  const theme = useTheme();
  const logout = useLogout();
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const activeExchange = useActiveExchange();
  const navigate = useNavigate();
  const { exchanges } = useCurrentUser();
  const selectExchange = useSelectExchange();
  const location = useLocation();

  const setActiveExchange = (exchangeInternalId: string) => {
    selectExchange(exchangeInternalId);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Link to={ROUTE_LOGIN} state={{ redirectTo: location }}>
          <LoginButton id={'menu__login'}>
            <UserIcon
              color={theme.palette.neutral300}
              width={'16px'}
              height={'16px'}
            />
            <Typography variant={'buttonsm'} color={'neutral300'}>
              {t('account-menu.isAuth-button-logIn')}
            </Typography>
          </LoginButton>
        </Link>
        <Link to={ROUTE_SIGNUP} state={{ redirectTo: location }}>
          <Button
            id={'menu__signup'}
            caption={t('account-menu.isAuth-button-signUp')}
          />
        </Link>
      </>
    );
  }

  return (
    <DropDown
      component={({ open }) => (
        <IconButton
          id={'menu__dropdown-account'}
          variant={'flat'}
          icon={<Avatar size={'medium'} image={activeExchange?.image} />}
          key={'user'}
          isFocused={open}
        />
      )}
      options={[
        {
          label: (
            <AccountDropdown>
              <Avatar size={'medium'} image={activeExchange?.image} />
              <AccountName variant={'body1'} color={'neutral100'}>
                {activeExchange?.internalName}
              </AccountName>
            </AccountDropdown>
          ),
          id: 'account-menu-dropdown__account-switcher',
          children: (exchanges?.length > 1 ? exchanges : []).map(
            (exchange, index) => ({
              onClick: () => setActiveExchange(exchange.internalId),
              id: `account-switcher-dropdown__account-${index}`,
              label: (
                <>
                  <Avatar size={'medium'} image={getImageOfAccount(index)} />
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
          ),
        },
        {
          label: t('account-menu.notAuth-dropdown-link-dashboard'),
          id: 'account-menu-dropdown__portfolio',
          href: generatePath(ROUTE_DASHBOARD),
          onClick: () => navigate(ROUTE_DASHBOARD),
        },
        {
          label: t('account-menu.notAuth-dropdown-link-balances'),
          id: 'account-menu-dropdown__balance',
          href: generatePath(ROUTE_MY_BALANCES),
          onClick: () => navigate(ROUTE_MY_BALANCES),
        },
        {
          label: t('account-menu.notAuth-dropdown-link-wallet'),
          id: 'account-menu-dropdown__wallet',
          href: generatePath(ROUTE_WALLET),
          onClick: () => navigate(ROUTE_WALLET),
        },
        {
          separator: true,
          id: 'account-menu-dropdown__log-out',
          element: (
            <LogoutButtonWrap>
              <Button
                caption={t('account-menu.notAuth-button-logOut')}
                onClick={logout}
              />
            </LogoutButtonWrap>
          ),
        },
      ]}
    />
  );
}

export default AccountMenu;
