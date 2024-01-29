import React from 'react';
import { ZigButton, CenteredLoader, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApiKeysContainer, TitleBox } from './atoms';
import { useParams } from 'react-router-dom';
import { useServiceApiKeysQuery } from '../../../../apis/serviceApiKey/api';
import { useZModal } from '../../../../components/ZModal/use';
import CreateApiKey from './modals/CreateApiKey';
import EditApiKey from './modals/EditApiKey';
import { ServiceApiKey } from 'apis/serviceApiKey/types';
import Stub from '../../../../components/Stub';
import ApiKeyEntry from './components/ApiKeyEntry';
import { useServiceDetails } from '../../../../apis/service/use';
import { getButtonDisabledPropsForExchangesWithoutApiKeyManagement } from '../util';
import { PageWithHeaderContainer } from '../styles';
import Deactivated from '../DeactivatedService';

const ApiKeyManagement: React.FC = () => {
  const { t } = useTranslation(['management', 'action', 'service']);
  const { serviceId } = useParams();
  const { showModal } = useZModal();
  const {
    isLoading,
    isFetching,
    data: keys,
  } = useServiceApiKeysQuery({ serviceId }, { refetchOnMountOrArgChange: 30 });
  const { data: serviceData } = useServiceDetails(serviceId);

  if (!serviceData?.activated) return <Deactivated />;

  return (
    <PageWithHeaderContainer>
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
          <ZigTypography variant={'h1'} id={'service-api__title'}>
            {t('api-keys.title')}
          </ZigTypography>
          <ZigTypography variant={'body1'} id={'service-api__description'}>
            {t('api-keys.description')}
          </ZigTypography>
        </Box>
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <ZigButton
            id={'service-api__create-key'}
            {...getButtonDisabledPropsForExchangesWithoutApiKeyManagement(
              serviceData?.exchange,
              t,
            )}
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
            <ZigTypography
              color='neutral200'
              variant={'h2'}
              id={'service-api__manage-keys-label'}
            >
              {t('api-keys.manage-keys')}
            </ZigTypography>
          )}

          {!keys.length && (
            <Stub
              id={'service-api__no-keys'}
              title={t('api-keys.no-keys')}
              description={t('api-keys.no-keys-description')}
            />
          )}
          {keys.map((apiKey) => (
            <ApiKeyEntry key={apiKey.id} apiKey={apiKey} />
          ))}
        </ApiKeysContainer>
      )}
    </PageWithHeaderContainer>
  );
};

export default ApiKeyManagement;
