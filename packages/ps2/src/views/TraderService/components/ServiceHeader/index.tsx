import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader, ZigButton } from '@zignaly-open/ui';
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

  useEffect(() => {
    if (menuDropDownRef && menuDropDownRef.current) {
      menuDropDownRef?.current?.setIsDropDownActive(false);
    }
  }, [serviceId]);

  const options = useMemo(
    () => [
      {
        id: 'service-management-header__choose-service',
        name: activeService?.serviceName,
        secondaryTitle: t('dropdown.manageServices'),
        isCompactElements: true,
        routes: myServicesList
          ?.map((service: TraderService) => ({
            id: `service-management-header__choose-${service?.serviceId}`,
            name: service?.serviceName,
            path: currentPath.replace(serviceId, service?.serviceId),
          }))
          // .concat({
          //   name: 't',
          //   id: 'aa',
          //   onClick: () => {
          //     // navigate(path)
          //   }
          //   active: false,
          //   sideElement,
          //   a: <ZigButton> {t('service:create.action')}</ZigButton>,
          // })
          .map(routeToSubHeaderRoute),
      },
      routeToSubHeaderRoute({
        name: t('managements-label'),
        path: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
          serviceId,
        }),
        id: `service-management-header__manage-funds`,
      }),
      routeToSubHeaderRoute({
        name: t('dropdown.trade.links.api'),
        path: generatePath(ROUTE_TRADING_SERVICE_API, {
          serviceId,
        }),
        id: `service-management-header__service-api`,
      }),
      routeToSubHeaderRoute({
        name: t('investors-label'),
        path: generatePath(ROUTE_TRADING_SERVICE_INVESTORS, {
          serviceId,
        }),
        id: `service-management-header__investors`,
      }),
      {
        id: 'service-management-header__choose-option',
        name: t('dropdown.profile.title'),
        routes: [
          {
            name: t('dropdown.profile.links.profile'),
            path: generatePath(ROUTE_TRADING_SERVICE, {
              serviceId,
            }),
            id: `service-management-header__service-profile`,
          },
          {
            name: t('dropdown.profile.links.profile-edit'),
            path: generatePath(ROUTE_TRADING_SERVICE_EDIT, {
              serviceId,
            }),
            id: `service-management-header__edit-service`,
          },
        ].map(routeToSubHeaderRoute),
      },
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
