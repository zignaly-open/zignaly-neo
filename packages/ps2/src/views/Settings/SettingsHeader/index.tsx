import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from '@zignaly-open/ui';
import { generatePath } from 'react-router-dom';
import {
  ROUTE_EDIT_PROFILE,
  ROUTE_2FA,
  ROUTE_PASSWORD,
  ROUTE_KYC,
} from '../../../routes';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';
import { useCurrentUser } from '../../../apis/user/use';
import CircleIcon from '@mui/icons-material/Circle';
import { useConvertRouteToSubHeaderFormat } from '../../TraderService/components/ServiceHeader/util';

function SettingsHeader() {
  const { t } = useTranslation(['settings', 'pages']);
  const user = useCurrentUser();

  const routeToSubHeaderRoute = useConvertRouteToSubHeaderFormat();
  const routes = useMemo(() => {
    const result = [
      {
        name: t('header.edit-profile'),
        path: generatePath(ROUTE_EDIT_PROFILE),
        id: `settings__edit-profile`,
      },
      {
        name: t('header.2fa'),
        path: generatePath(ROUTE_2FA),
        id: `settings__edit-2fa`,
        sideElement: !user['2FAEnable'] && (
          <CircleIcon
            sx={{
              width: '10px',
              height: '10px',
              color: 'red',
            }}
          />
        ),
      },
      {
        name: t('header.edit-password'),
        path: generatePath(ROUTE_PASSWORD),
        id: `settings__edit-password`,
      },
    ];
    isFeatureOn(Features.Kyc) &&
      result.push({
        name: t('header.verification-kyc'),
        path: generatePath(ROUTE_KYC),
        id: `settings__kyc`,
      });
    return result;
  }, [t, user['2FAEnable']]);

  return (
    <SubHeader
      containerSx={{ maxWidth: 900 }}
      routes={routes.map(routeToSubHeaderRoute)}
    />
  );
}

export default SettingsHeader;
