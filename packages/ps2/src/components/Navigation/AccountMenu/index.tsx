import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginButton, AccountDropdown, AccountName } from './styles';
import { useMediaQuery, useTheme } from '@mui/material';
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
  ZigButton,
} from '@zignaly-open/ui';
import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_MY_BALANCES,
  ROUTE_WALLET,
  ROUTE_REFERRALS,
  ROUTE_REWARDS,
} from '../../../routes';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { getImageOfAccount } from '../../../util/images';
import { useZModal } from 'components/ZModal/use';
import UpdatePasswordModal from 'views/Settings/UpdatePasswordModal';
import Enable2FAModal from 'views/Settings/Enable2FAModal';
import DepositModal from '../../../views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { Add } from '@mui/icons-material';
import { DropDownHandle } from '@zignaly-open/ui/lib/components/display/DropDown/types';

function AccountMenu(): React.ReactElement | null {
  const theme = useTheme();
  const logout = useLogout();
  const { t } = useTranslation(['common', 'action']);
  const isAuthenticated = useIsAuthenticated();
  const activeExchange = useActiveExchange();
  const navigate = useNavigate();
  const { exchanges } = useCurrentUser();
  const selectExchange = useSelectExchange();
  const location = useLocation();
  const { showModal } = useZModal();
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const dropDownRef = useRef<DropDownHandle>(null);
  const onClose = useCallback(() => {
    dropDownRef.current?.closeDropDown();
  }, [dropDownRef]);

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
  } else if (!md) return null;

  return (
    <DropDown
      ref={dropDownRef}
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
          label: t('account-menu.portfolio'),
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
          id: 'account-menu-dropdown__settings',
          label: t('account-menu.notAuth-dropdown-link-settings'),
          children: [
            {
              id: `menu-dropdown-settings__password`,
              label: t('account-menu.notAuth-dropdown-link-password'),
              onClick: () => showModal(UpdatePasswordModal),
            },
            {
              id: `menu-dropdown-settings__2fa`,
              label: t('account-menu.notAuth-dropdown-link-2fa'),
              onClick: () => showModal(Enable2FAModal),
            },
          ],
        },
        {
          element: (
            <ZigButton
              id={'account-menu-dropdown__deposit'}
              startIcon={<Add />}
              sx={{ fontWeight: 600, mb: 1 }}
              variant={'contained'}
              onClick={() => {
                // fun fact: without onClose react-select acts funky
                onClose();
                showModal(DepositModal, {
                  ctaId: 'account-menu-deposit',
                });
              }}
            >
              {t('action:deposit')}
            </ZigButton>
          ),
        },
        {
          separator: true,
          label: (
            <>
              <img
                width={24}
                height={24}
                src='/images/tab-rewards.svg'
                alt={t('account-menu.rewards')}
              />
              {t('account-menu.rewards')}
            </>
          ),
          id: 'account-menu-dropdown__rewards',
          href: generatePath(ROUTE_REWARDS),
          onClick: () => navigate(ROUTE_REWARDS),
        },
        {
          label: (
            <>
              <img
                width={24}
                height={24}
                src='/images/tab-referrals.svg'
                alt={t('account-menu.rewards')}
              />
              {t('account-menu.referrals')}
            </>
          ),
          id: 'account-menu-dropdown__referrals',
          href: generatePath(ROUTE_REFERRALS),
          onClick: () => navigate(ROUTE_REFERRALS),
        },
        {
          separator: true,
          label: <>{t('account-menu.notAuth-button-logOut')}</>,
          id: 'account-menu-dropdown__logout',
          onClick: logout,
        },
      ]}
    />
  );
}

export default AccountMenu;
