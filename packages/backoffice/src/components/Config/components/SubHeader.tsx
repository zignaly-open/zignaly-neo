import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from '@zignaly-open/ui';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ROUTE_CONFIG_PROFILE,
  ROUTE_CONFIG_COMMUNICATION,
  ROUTE_CONFIG_SETTINGS,
  // ROUTE_CONFIG_THEME,
} from '../../../routes';
import { useUserInfoQuery } from '../../../apis/session/api';

function WhitelabelConfigHeader() {
  const { t } = useTranslation('config');
  const currentPath = useLocation()?.pathname;
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfoQuery();
  const { wl: activeWl } = useParams();
  const options = userInfo?.projectIds || [];

  const routes = useMemo(
    () => [
      {
        id: 'settings__choose-wl',
        secondaryTitle: t('managing-whitelabel'),
        isCompactElements: true,
        name: activeWl,
        routes: options?.map((service: string) => ({
          id: 'settings__choose-wl' + service,
          name: service,
          onClick: () =>
            navigate(generatePath(ROUTE_CONFIG_PROFILE, { wl: service })),
          active: activeWl === service,
        })),
      },
      ...[
        {
          name: t('navigation.profile-config'),
          path: ROUTE_CONFIG_PROFILE,
          id: `settings__edit-profile`,
        },
        {
          name: t('navigation.communication-config'),
          path: ROUTE_CONFIG_COMMUNICATION,
          id: `settings__edit-2fa`,
        },
        {
          name: t('navigation.settings-config'),
          path: ROUTE_CONFIG_SETTINGS,
          id: `settings__edit-password`,
        },
        // {
        //   name: t('navigation.theme-config'),
        //   path: ROUTE_CONFIG_THEME,
        //   id: `settings__edit-password`,
        // },
      ].map(({ path, ...x }) => ({
        ...x,
        onClick: () => navigate(generatePath(path, { wl: activeWl })),
        active: currentPath === generatePath(path, { wl: activeWl }),
      })),
    ],
    [t, currentPath, options],
  );

  return <SubHeader routes={routes} />;
}

export default WhitelabelConfigHeader;
