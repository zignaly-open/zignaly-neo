import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader, ZigButton, ZigTypography } from '@zignaly-open/ui';
import {
  useIsServiceOwner,
  useTraderServices,
} from '../../../../apis/service/use';
import { TraderService } from '../../../../apis/service/types';
import { generatePath, useParams, useLocation } from 'react-router-dom';
import {
  ROUTE_TRADING_SERVICE,
  ROUTE_TRADING_SERVICE_API,
  ROUTE_TRADING_SERVICE_INVESTORS,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_TRADING_SERVICE_EDIT,
  ROUTE_BECOME_TRADER,
} from '../../../../routes';
import { useConvertRouteToSubHeaderFormat } from './util';

function ServiceHeader() {
  const menuDropDownRef = useRef(null);
  const { t } = useTranslation('service-header');
  const { serviceId } = useParams();
  const currentPath = useLocation()?.pathname;
  const routeToSubHeaderRoute = useConvertRouteToSubHeaderFormat();
  const isOwner = useIsServiceOwner(serviceId);

  const { data: myServicesList } = useTraderServices();
  const activeService = myServicesList?.find(
    (s: TraderService) => s.serviceId === serviceId,
  );

  // useEffect(() => {
  //   if (menuDropDownRef && menuDropDownRef.current) {
  //     menuDropDownRef?.current?.setIsDropDownActive(false);
  //   }
  // }, [serviceId]);
  const options = useMemo(
    () => [
      {
        id: 'service-management-header__choose-service',
        label: activeService?.serviceName,
        secondaryTitle: t('dropdown.manageServices'),
        isCompactElements: true,
        // sx: { minWidth: '300px' },
        routes: myServicesList
          ?.map((service: TraderService) => ({
            id: `service-management-header__choose-${service?.serviceId}`,
            label: service?.serviceName,
            href: currentPath.replace(serviceId, service?.serviceId),
          }))
          .map(routeToSubHeaderRoute)
          .concat({
            separator: true,
            id: `service-management-header__create-service`,
            // element: (
            //   <ZigButton variant='text'>
            //     {t('dropdown.createService')}
            //   </ZigButton>
            // ),
            label: (
              <ZigTypography
                component={'p'}
                sx={{
                  textAlign: 'center',
                  p: '4px 9px 3px',
                  fontSize: '14px',
                  width: '100%',
                }}
                color={'links'}
              >
                {t('dropdown.createService')}
              </ZigTypography>
            ),
            href: generatePath(ROUTE_BECOME_TRADER),
          }),
      },
      routeToSubHeaderRoute({
        label: t('managements-label'),
        href: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
          serviceId,
        }),
        id: `service-management-header__manage-funds`,
      }),
      routeToSubHeaderRoute({
        label: t('dropdown.trade.links.api'),
        href: generatePath(ROUTE_TRADING_SERVICE_API, {
          serviceId,
        }),
        id: `service-management-header__service-api`,
      }),
      routeToSubHeaderRoute({
        label: t('investors-label'),
        href: generatePath(ROUTE_TRADING_SERVICE_INVESTORS, {
          serviceId,
        }),
        id: `service-management-header__investors`,
      }),
      routeToSubHeaderRoute({
        id: 'service-management-header__choose-option',
        label: t('dropdown.profile.title'),
        routes: [
          {
            label: t('dropdown.profile.links.profile'),
            href: generatePath(ROUTE_TRADING_SERVICE, {
              serviceId,
            }),
            id: `service-management-header__service-profile`,
          },
          {
            label: t('dropdown.profile.links.profile-edit'),
            href: generatePath(ROUTE_TRADING_SERVICE_EDIT, {
              serviceId,
            }),
            id: `service-management-header__edit-service`,
          },
        ].map(routeToSubHeaderRoute),
      }),
    ],
    [menuDropDownRef, activeService, myServicesList, t, currentPath],
  );

  if (!isOwner) {
    // Show nothing for non-service owners
    return <></>;
  }

  return <SubHeader routes={options} />;
}

export default ServiceHeader;
