import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavList, LoginButton } from './styles';
import { DropDownContainer, NavLink } from '../ExtraNavigationDropdown/styles';
import { useTheme } from 'styled-components';
import { useIsAuthenticated, useLogout } from '../../auth/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  UserIcon,
} from '@zignaly-open/ui';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../routes';
import { Link } from 'react-router-dom';
import { getImageOfAccount } from './util';

function AccountMenu(): React.ReactElement | null {
  const theme = useTheme() as Theme;
  const logout = useLogout();
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const dropDownRef =
    useRef<{ setIsDropDownActive: (isActive: boolean) => void }>(null);

  const closeDropdown = useCallback(() => {
    dropDownRef.current?.setIsDropDownActive(false);
  }, [dropDownRef]);

  // const { exchanges: exchangesOfAccount } = useUser();
  //
  // const currentExchangeId = exchangesOfAccount[0].exchangeId;
  //
  // const currentExchange = useMemo(() => {
  //   if (!currentExchangeId || !exchangesOfAccount) return null;
  //
  //   const index = exchangesOfAccount
  //     .map((e: any) => e.internalId)
  //     .indexOf(currentExchangeId);
  //
  //   return {
  //     index,
  //     ...exchangesOfAccount[index],
  //   };
  // }, [currentExchangeId, exchangesOfAccount]);

  if (!isAuthenticated) {
    return (
      <>
        <Link to={ROUTE_SIGNUP}>
          <Button caption={t('account-menu.isAuth-button-signUp')} />
        </Link>
        <Link to={ROUTE_LOGIN}>
          <LoginButton>
            <UserIcon color={theme.neutral300} width={'16px'} height={'16px'} />
            <Typography variant={'buttonsm'} color={'neutral300'}>
              {t('account-menu.isAuth-button-logIn')}
            </Typography>
          </LoginButton>
        </Link>
      </>
    );
  }

  return (
    <IconButton
      ref={dropDownRef}
      variant={'flat'}
      dropDownOptions={{
        alignment: 'right',
        zIndex: 9999,
        width: '220px',
      }}
      icon={<Avatar size={'medium'} image={getImageOfAccount(0)} />}
      key={'user'}
      renderDropDown={
        <>
          {/*{currentExchange && (*/}
          {/*  <AccountSelector onSelectAccount={closeDropdown} />*/}
          {/*)}*/}
          <DropDownContainer>
            <NavList>
              <Link to={ROUTE_DASHBOARD}>
                <NavLink onClick={closeDropdown}>
                  {t('account-menu.notAuth-dropdown-link-dashboard')}
                </NavLink>
              </Link>
              <Link to={ROUTE_DASHBOARD}>
                <NavLink onClick={closeDropdown}>
                  {t('account-menu.notAuth-dropdown-link-balances')}
                </NavLink>
              </Link>
            </NavList>
            <NavList className={'last'}>
              <Button
                caption={t('account-menu.notAuth-button-logOut')}
                onClick={logout}
              />
            </NavList>
          </DropDownContainer>
        </>
      }
    />
  );
}

export default AccountMenu;
