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
import { RouteGroup } from 'views/TraderService/components/ServiceHeader/atoms';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';
import DoneIcon from '@mui/icons-material/Done';
import { useCurrentUser } from '../../../apis/user/use';
import CircleIcon from '@mui/icons-material/Circle';

function SettingsHeader() {
  const { t } = useTranslation(['settings', 'pages']);
  const user = useCurrentUser();
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
                sideElement: user['2FAEnable'] ? (
                  <DoneIcon
                    sx={{
                      width: '15px',
                      height: '15px',
                      color: 'greenGraph',
                      mt: '-5px',
                    }}
                  />
                ) : (
                  <CircleIcon
                    sx={{
                      width: '10px',
                      height: '10px',
                      color: 'red',
                      mt: '-5px',
                    }}
                  />
                ),
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
            <RouteGroup
              routes={[
                {
                  name: t('header.verification-kyc'),
                  path: generatePath(ROUTE_KYC),
                  id: `settings__kyc`,
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
