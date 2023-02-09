import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { ApiKeysContainer, TitleBox } from './atoms';
import { useParams } from 'react-router-dom';
import { useServiceApiKeysQuery } from '../../../../apis/serviceApiKey/api';
import CenteredLoader from '../../../../components/CenteredLoader';
import { useZModal } from '../../../../components/ZModal/use';
import CreateApiKey from './modals/CreateApiKey';
import EditApiKey from './modals/EditApiKey';
import { ServiceApiKey } from 'apis/serviceApiKey/types';
import Stub from '../../../../components/Stub';
import ApiKeyEntry from './components/ApiKeyEntry';
import { ExternalLink } from '../../../../components/AnchorLink';

const ApiKeyManagement: React.FC = () => {
  const { t } = useTranslation(['management', 'actions']);
  const { serviceId } = useParams();
  const { showModal } = useZModal();
  const {
    isLoading,
    isFetching,
    data: keys,
  } = useServiceApiKeysQuery({ serviceId });

  return (
    <>
      <TitleBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            flex: 1,
            mr: 5,
          }}
        >
          <ZigTypography variant={'h1'}>{t('api-keys.title')}</ZigTypography>
          <ZigTypography variant={'body1'}>
            <Trans i18nKey='api-keys.description' t={t}>
              <ExternalLink href={'https://zignaly.com'} />
            </Trans>
          </ZigTypography>
        </Box>
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <ZigButton
            id={'trader-api__create-key'}
            onClick={() =>
              showModal(CreateApiKey, {
                serviceId,
                afterSave: (result: ServiceApiKey) =>
                  showModal(EditApiKey, { apiKey: result, serviceId }),
              })
            }
            variant='contained'
            size='large'
          >
            {t('api-keys.create-key')}
          </ZigButton>
        </Box>
      </TitleBox>

      {isLoading || isFetching ? (
        <CenteredLoader />
      ) : (
        <ApiKeysContainer>
          {!!keys.length && (
            <ZigTypography color='neutral200' variant={'h2'}>
              {t('api-keys.manage-keys')}
            </ZigTypography>
          )}

          {!keys.length && (
            <Stub
              title={t('api-keys.no-keys')}
              description={t('api-keys.no-keys-description')}
            />
          )}
          {keys.map((apiKey) => (
            <ApiKeyEntry key={apiKey.id} apiKey={apiKey} />
          ))}
        </ApiKeysContainer>
      )}
    </>
  );
};

export default ApiKeyManagement;
