import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavList,
  LoginButton,
  AccountDropDown,
  AccountDropdown,
  LogoutButtonWrap,
  AccountName,
} from './styles';
import { DropDownContainer, NavLink } from '../ExtraNavigationDropdown/styles';
import { useTheme } from 'styled-components';
import {
  useActiveExchange,
  useCurrentUser,
  useIsAuthenticated,
  useLogout,
  useSelectExchange,
} from '../../auth/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
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
} from '../../../routes';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownHandle } from '@zignaly-open/ui/lib/components/display/DropDown/types';
import { getImageOfAccount } from '../../../util/images';

function AccountMenu(): React.ReactElement | null {
  const theme = useTheme() as Theme;
  const logout = useLogout();
  const { t } = useTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const activeExchange = useActiveExchange();
  const navigate = useNavigate();
  const dropDownRef = useRef<DropDownHandle>(null);

  const { exchanges } = useCurrentUser();
  const selectExchange = useSelectExchange();

  const setActiveExchange = (exchangeInternalId: string) => {
    selectExchange(exchangeInternalId);
  };

  const closeDropdown = useCallback(() => {
    dropDownRef.current?.closeDropDown();
  }, [dropDownRef]);

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
    <DropDown
      ref={dropDownRef}
      component={({ open }) => (
        <IconButton
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
          children: exchanges.map((exchange, index) => ({
            onClick: () => setActiveExchange(exchange.internalId),
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
          })),
        },
        {
          label: t('account-menu.notAuth-dropdown-link-dashboard'),
          onClick: () => navigate(ROUTE_DASHBOARD),
        },
        {
          label: t('account-menu.notAuth-dropdown-link-balances'),
          onClick: () => navigate(ROUTE_MY_BALANCES),
        },
        {
          separator: true,
          element: (
            <LogoutButtonWrap>
              <Button
                minWidth={'100%'}
                caption={t('account-menu.notAuth-button-logOut')}
                onClick={logout}
              />
            </LogoutButtonWrap>
          ),
        },
      ]}
      content={
        <AccountDropDown>
          <DropDownContainer>
            <NavList>
              <Link to={ROUTE_DASHBOARD}>
                <NavLink onClick={closeDropdown}>
                  {t('account-menu.notAuth-dropdown-link-dashboard')}
                </NavLink>
              </Link>
              <Link to={ROUTE_MY_BALANCES}>
                <NavLink onClick={closeDropdown}>
                  {t('account-menu.notAuth-dropdown-link-balances')}
                </NavLink>
              </Link>
            </NavList>
            <NavList className={'last'}>
              <Button
                minWidth={'100%'}
                caption={t('account-menu.notAuth-button-logOut')}
                onClick={logout}
              />
            </NavList>
          </DropDownContainer>
        </AccountDropDown>
      }
    />
  );
}

export default AccountMenu;
