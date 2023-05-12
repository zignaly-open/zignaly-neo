import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MarginContainer, ZigTypography } from '@zignaly-open/ui';
import {
  Layout,
  Container,
  Options,
  Option,
  ServiceDropDown,
  ServiceOption,
} from './styles';
import {
  useIsServiceOwner,
  useTraderServices,
} from '../../../../apis/service/use';
import { TraderService } from '../../../../apis/service/types';
import { generatePath, Link, useParams, useLocation } from 'react-router-dom';
import { RouteDropdown, RouteGroup } from './atoms';
import {
  ROUTE_TRADING_SERVICE,
  ROUTE_TRADING_SERVICE_API,
  ROUTE_TRADING_SERVICE_INVESTORS,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_TRADING_SERVICE_EDIT,
} from '../../../../routes';

function ServiceHeader() {
  const menuDropDownRef = useRef(null);
  const { t } = useTranslation('service-header');
  const { serviceId } = useParams();
  const currentPath = useLocation()?.pathname;
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

  if (!isOwner) {
    // Show nothing for non-service owners
    return <></>;
  }

  return (
    <Layout>
      <MarginContainer>
        <Container>
          <ServiceDropDown
            id={'service-management-header__choose-service'}
            ref={menuDropDownRef}
            title={activeService?.serviceName}
            secondaryTitle={t('dropdown.manageServices')}
            dropDownOptions={{
              maxHeight: '300px',
            }}
          >
            <Options>
              {myServicesList?.map((service: TraderService) => (
                <Link
                  id={`service-management-header__choose-${service?.serviceId}`}
                  to={currentPath.replace(serviceId, service?.serviceId)}
                  key={`--route-key-${service?.serviceId}`}
                >
                  <ServiceOption active={serviceId === service?.serviceId}>
                    <ZigTypography color='inherit' variant={'body1'}>
                      {service?.serviceName}
                    </ZigTypography>
                  </ServiceOption>
                </Link>
              ))}
            </Options>
          </ServiceDropDown>

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

export default ServiceHeader;
