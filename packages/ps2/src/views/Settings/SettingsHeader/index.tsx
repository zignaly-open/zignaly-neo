import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MarginContainer } from '@zignaly-open/ui';
import { Layout, Container } from './styles';
import { generatePath } from 'react-router-dom';
import {
  ROUTE_TRADING_SERVICE,
  ROUTE_TRADING_SERVICE_API,
  ROUTE_TRADING_SERVICE_INVESTORS,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_TRADING_SERVICE_EDIT,
} from '../../../routes';
import {
  RouteDropdown,
  RouteGroup,
} from 'views/TraderService/components/ServiceHeader/atoms';

function SettingsHeader() {
  const menuDropDownRef = useRef(null);
  const { t } = useTranslation('service-header');
  const serviceId = 'sfdv sdvsfd';

  useEffect(() => {
    if (menuDropDownRef && menuDropDownRef.current) {
      menuDropDownRef?.current?.setIsDropDownActive(false);
    }
  }, [serviceId]);

  return (
    <Layout>
      <MarginContainer>
        <Container>
          <RouteGroup
            routes={[
              {
                name: t('managements-label'),
                path: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                  serviceId,
                }),
                id: `service-management-header__manage-funds`,
              },
            ]}
          />

          <RouteGroup
            routes={[
              {
                name: t('dropdown.trade.links.api'),
                path: generatePath(ROUTE_TRADING_SERVICE_API, { serviceId }),
                id: `service-management-header__service-api`,
              },
            ]}
          />

          <RouteGroup
            routes={[
              {
                name: t('investors-label'),
                path: generatePath(ROUTE_TRADING_SERVICE_INVESTORS, {
                  serviceId,
                }),
                id: `service-management-header__investors`,
              },
            ]}
          />

          <RouteDropdown
            id={'service-management-header__choose-option'}
            title={t('dropdown.profile.title')}
            routes={[
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
            ]}
          />
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default SettingsHeader;
