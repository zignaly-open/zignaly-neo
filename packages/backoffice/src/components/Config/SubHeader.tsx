import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from '@zignaly-open/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ROUTE_CONFIG_PROFILE,
  ROUTE_CONFIG_COMMUNICATION,
  ROUTE_CONFIG_SETTINGS,
  ROUTE_CONFIG_THEME,
} from '../../routes';

function WhitelabelConfigHeader() {
  const { t } = useTranslation('config');
  const currentPath = useLocation()?.pathname;
  const navigate = useNavigate();

  const routes = useMemo(
    () => [
      {
        name: t('navigation.profile-config'),
        onClick: () => navigate(ROUTE_CONFIG_PROFILE),
        active: currentPath === ROUTE_CONFIG_PROFILE,
        id: `settings__edit-profile`,
      },
      {
        name: t('navigation.communication-config'),
        onClick: () => navigate(ROUTE_CONFIG_COMMUNICATION),
        active: currentPath === ROUTE_CONFIG_COMMUNICATION,
        id: `settings__edit-2fa`,
      },
      {
        name: t('navigation.settings-config'),
        onClick: () => navigate(ROUTE_CONFIG_SETTINGS),
        active: currentPath === ROUTE_CONFIG_SETTINGS,
        id: `settings__edit-password`,
      },
      {
        name: t('navigation.theme-config'),
        onClick: () => navigate(ROUTE_CONFIG_THEME),
        active: currentPath === ROUTE_CONFIG_THEME,
        id: `settings__edit-password`,
      },
    ],
    [t, currentPath],
  );

  return <SubHeader containerSx={{ maxWidth: 900 }} routes={routes} />;
}

export default WhitelabelConfigHeader;
