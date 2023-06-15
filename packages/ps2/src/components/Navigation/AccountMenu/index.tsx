import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LoginButton,
  AccountDropdown,
  AccountName,
  HeaderDropdownButton,
} from './styles';
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
  ZigDropdown,
  ZigTypography,
  ZigButton,
  ZigPlusIcon,
  ZigLoginUserIcon,
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
import { ZigDropdownHandleType, ZigArrowBottomIcon } from '@zignaly-open/ui';
import { ReactComponent as GiftIcon } from '../../../images/tab-rewards.svg';
import { ReactComponent as InviteIcon } from '../../../images/tab-referrals.svg';
import { usePrefetchTranslation } from '../../../util/i18nextHelpers';

function AccountMenu(): React.ReactElement | null {
  const theme = useTheme();
  usePrefetchTranslation('settings');
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
  const dropDownRef = useRef<ZigDropdownHandleType>(null);
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
            <ZigLoginUserIcon
              color={theme.palette.neutral300}
              width={'16px'}
              height={'16px'}
            />
            <ZigTypography variant={'caption'} color={'neutral300'}>
              {t('account-menu.isAuth-button-logIn')}
            </ZigTypography>
          </LoginButton>
        </Link>
        <Link to={ROUTE_SIGNUP} state={{ redirectTo: location }}>
          <ZigButton id={'menu__signup'} variant={'contained'}>
            {t('account-menu.isAuth-button-signUp')}
          </ZigButton>
        </Link>
      </>
    );
  } else if (!md) return null;

  return (
    <ZigDropdown
      ref={dropDownRef}
      component={({ open }) => (
        <HeaderDropdownButton
          id={'menu__dropdown-account'}
          key={'user'}
          active={open}
          sx={{
            pl: '20px',
            pr: '20px',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Avatar size={'medium'} image={activeExchange?.image} />
          <ZigArrowBottomIcon
            color={theme.palette.neutral300}
            width={'16px'}
            height={'16px'}
          />
        </HeaderDropdownButton>
      )}
      options={[
        {
          label: (
            <AccountDropdown>
              <Avatar size={'medium'} image={activeExchange?.image} />
              <AccountName variant={'body1'} color={'neutral200'}>
                {activeExchange?.internalName}
              </AccountName>
            </AccountDropdown>
          ),
          id: 'account-menu-dropdown__account-switcher',
          customStyle: `background: #171a31;`,
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
              id={'invest-form__deposit'}
              startIcon={<ZigPlusIcon width={10} height={10} />}
              sx={{ fontWeight: 600, mt: '10px', mb: '12px' }}
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
        { separator: true },
        {
          customStyle: `margin-top: 4px;`,
          label: (
            <>
              <GiftIcon
                width={24}
                height={24}
                style={{ marginTop: -1 }}
                color={theme.palette.neutral175}
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
              <InviteIcon
                width={24}
                height={24}
                style={{ marginTop: -1 }}
                color={theme.palette.neutral175}
              />
              {t('account-menu.referrals')}
            </>
          ),
          id: 'account-menu-dropdown__referrals',
          href: generatePath(ROUTE_REFERRALS),
          onClick: () => navigate(ROUTE_REFERRALS),
        },
        { separator: true },
        {
          label: (
            <ZigTypography
              component={'p'}
              sx={{
                textAlign: 'center',
                p: '4px 9px 9px',
                fontSize: '14px',
                width: '100%',
              }}
              color={'links'}
            >
              {t('account-menu.notAuth-button-logOut')}
            </ZigTypography>
          ),
          id: 'account-menu-dropdown__logout',
          onClick: logout,
        },
      ]}
    />
  );
}

export default AccountMenu;
