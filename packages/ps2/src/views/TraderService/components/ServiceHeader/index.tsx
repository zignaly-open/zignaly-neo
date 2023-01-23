import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MarginContainer, MenuDropDown, ZigTypography } from '@zignaly-open/ui';
import { Layout, Container, Options, Option } from './styles';
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

  const myServicesList = useTraderServices();
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
          <MenuDropDown
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
                  to={currentPath.replace(serviceId, service?.serviceId)}
                  key={`--route-key-${service?.serviceId}`}
                >
                  <Option active={serviceId === service?.serviceId}>
                    <ZigTypography variant={'body1'}>
                      {service?.serviceName}
                    </ZigTypography>
                  </Option>
                </Link>
              ))}
            </Options>
          </MenuDropDown>

          <RouteGroup
            routes={[
              {
                name: t('managements-label'),
                path: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                  serviceId,
                }),
              },
            ]}
          />

          <RouteGroup
            routes={[
              {
                name: t('dropdown.trade.links.api'),
                path: generatePath(ROUTE_TRADING_SERVICE_API, { serviceId }),
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
              },
            ]}
          />

          <RouteDropdown
            title={t('dropdown.profile.title')}
            routes={[
              {
                name: t('dropdown.profile.links.profile'),
                path: generatePath(ROUTE_TRADING_SERVICE, {
                  serviceId,
                }),
              },
              {
                name: t('dropdown.profile.links.profile-edit'),
                path: generatePath(ROUTE_TRADING_SERVICE_EDIT, {
                  serviceId,
                }),
              },
            ]}
          />
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default ServiceHeader;
