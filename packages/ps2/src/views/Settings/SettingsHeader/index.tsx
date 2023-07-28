import React from 'react';
import { useTranslation } from 'react-i18next';
import { MarginContainer } from '@zignaly-open/ui';
import { Layout, Container } from './styles';
import { generatePath } from 'react-router-dom';
import {
  ROUTE_EDIT_PROFILE,
  ROUTE_2FA,
  ROUTE_PASSWORD,
  ROUTE_KYC,
} from '../../../routes';
import {
  RouteDropdown,
  RouteGroup,
} from 'views/TraderService/components/ServiceHeader/atoms';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';

function SettingsHeader() {
  const { t } = useTranslation('settings');
  return (
    <Layout>
      <MarginContainer>
        <Container>
          <RouteGroup
            routes={[
              {
                name: t('header.edit-profile'),
                path: generatePath(ROUTE_EDIT_PROFILE),
                id: `settings__edit-profile`,
              },
            ]}
          />

          <RouteGroup
            routes={[
              {
                name: t('header.2fa'),
                path: generatePath(ROUTE_2FA),
                id: `settings__edit-2fa`,
              },
            ]}
          />

          <RouteGroup
            routes={[
              {
                name: t('header.edit-password'),
                path: generatePath(ROUTE_PASSWORD),
                id: `settings__edit-password`,
              },
            ]}
          />

          {isFeatureOn(Features.Kyc) && (
            <RouteDropdown
              id={'settings_verification__choose-option'}
              title={t('header.verification')}
              routes={[
                {
                  name: t('header.verification-kyc'),
                  path: generatePath(ROUTE_KYC, {
                    type: 'kyc',
                  }),
                  id: `settings__verification-kyc`,
                },
                {
                  name: t('header.verification-kyb'),
                  path: generatePath(ROUTE_KYC, {
                    type: 'kyb',
                  }),
                  id: `settings__verification-kyb`,
                },
              ]}
            />
          )}
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default SettingsHeader;
