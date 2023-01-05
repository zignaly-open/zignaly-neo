import React from 'react';
import {
  CloneIcon,
  dark,
  InputText,
  ZigButton,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PencilIcon from '@mui/icons-material/Create';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTE_TRADING_SERVICE_POSITIONS } from '../../../../routes';
import AnchorLink from '../../../../components/AnchorLink';
import { ApiKey, ApiKeysContainer, TextWrapperRow, TitleBox } from './atoms';
import { generatePath, useParams } from 'react-router-dom';
import {
  useServiceApiKeyDeleteMutation,
  useServiceApiKeysQuery,
} from '../../../../apis/serviceApiKey/api';
import CenteredLoader from '../../../../components/CenteredLoader';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../../util/hooks/useToast';
import { addReadIfMissing } from './util';
import { useZConfirm, useZModal } from '../../../../components/ZModal/use';
import CreateApiKey from './modals/CreateApiKey';
import EditApiKey from './modals/EditApiKey';
import { ServiceApiKey } from 'apis/serviceApiKey/types';
import Stub from '../../../../components/Stub';

const ApiKeyManagement: React.FC = () => {
  const { t, i18n } = useTranslation(['management', 'actions']);
  const { serviceId } = useParams();
  const { showModal } = useZModal();
  const askConfirm = useZConfirm();
  const toast = useToast();
  const {
    isLoading,
    isFetching,
    data: keys,
  } = useServiceApiKeysQuery({ serviceId });
  const [deleteKey, { isLoading: isDeleting }] =
    useServiceApiKeyDeleteMutation();

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
              <AnchorLink
                to={generatePath(ROUTE_TRADING_SERVICE_POSITIONS, {
                  serviceId,
                })}
              />
            </Trans>
          </ZigTypography>
        </Box>
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <ZigButton
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

      {isLoading || isDeleting || isFetching ? (
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
            <ApiKey key={apiKey.id}>
              <ZigTypography variant='h3' sx={{ mb: 1.5 }}>
                {apiKey.alias}
              </ZigTypography>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 3 }}>
                <Box sx={{ flex: 5, mr: 2 }}>
                  <InputText
                    placeholder={t('api-keys.api-key')}
                    label={t('api-keys.api-key')}
                    readOnly={true}
                    value={apiKey.key}
                    rightSideElement={
                      <CloneIcon
                        width={40}
                        height={40}
                        color={dark.neutral300}
                      />
                    }
                    onClickRightSideElement={() => {
                      copy(apiKey.key);
                      toast.success(t('action:copied'));
                    }}
                  />
                </Box>
                <Box sx={{ flex: 2 }}>
                  <ZigTypography color={'neutral200'}>
                    {t('api-keys.permission-label')}
                  </ZigTypography>
                  <TextWrapperRow>
                    <ZigTypography color={'neutral100'}>
                      {addReadIfMissing(apiKey.permissions)
                        .map((p) =>
                          i18n.exists(`management:api-keys.permissions.${p}`)
                            ? t(`api-keys.permissions.${p}`)
                            : p,
                        )
                        .join(', ')}
                    </ZigTypography>
                  </TextWrapperRow>
                </Box>
                <Box sx={{ flex: 2 }}>
                  <ZigTypography color={'neutral200'}>
                    {t('api-keys.ip-restrictions')}
                  </ZigTypography>
                  <TextWrapperRow>
                    <ZigTypography color={'neutral100'}>
                      {apiKey.ips.join(', ') ||
                        t('api-keys.ip-restrictions-none')}
                    </ZigTypography>
                  </TextWrapperRow>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <ZigButton
                    sx={{ mr: 2 }}
                    onClick={() => showModal(EditApiKey, { apiKey, serviceId })}
                    startIcon={<PencilIcon />}
                    variant={'outlined'}
                  >
                    {t('action:edit')}
                  </ZigButton>
                  <ZigButton
                    sx={{ mr: 2 }}
                    onClick={() =>
                      askConfirm({
                        title: t('api-keys.delete-title', {
                          title: apiKey.alias,
                        }),
                        yesLabel: t('action:delete'),
                        yesButtonProps: {
                          color: 'danger',
                          variant: 'outlined',
                        },
                        description: t('api-keys.delete-description'),
                        yesAction: () =>
                          deleteKey({ serviceId, keyId: apiKey.id }),
                      })
                    }
                    color={'danger'}
                    startIcon={<DeleteIcon />}
                    variant={'outlined'}
                  >
                    {t('action:delete')}
                  </ZigButton>
                </Box>
              </Box>
            </ApiKey>
          ))}
        </ApiKeysContainer>
      )}
    </>
  );
};

export default ApiKeyManagement;
