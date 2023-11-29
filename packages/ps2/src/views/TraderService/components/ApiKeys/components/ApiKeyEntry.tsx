import React from 'react';
import { ZigButton, ZigCopyText, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { ApiKey, TextWrapperRow } from '../atoms';
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../../util/hooks/useToast';
import { addReadIfMissing } from '../util';
import {
  useZModal,
  useZTypeWordConfirm,
} from '../../../../../components/ZModal/use';
import EditApiKey from '../modals/EditApiKey';
import { useServiceApiKeyDeleteMutation } from '../../../../../apis/serviceApiKey/api';
import { useCheck2FA } from '../../../../../apis/user/use';
import {
  ServiceApiKey,
  ServiceApiKeyDeletePayload,
} from '../../../../../apis/serviceApiKey/types';
import { useRefetchIfDesynchronizedState } from '../../../../../apis/serviceApiKey/use';
import { BackendErrorResponse } from '../../../../../util/errors';
import EditIcon from '@mui/icons-material/Edit';

const ApiKeyEntry: React.FC<{ apiKey: ServiceApiKey }> = ({ apiKey }) => {
  const { t, i18n } = useTranslation(['management', 'action']);
  const { serviceId } = useParams();
  const refetchIfDesynchronized = useRefetchIfDesynchronizedState();
  const { showModal } = useZModal();
  const askConfirm = useZTypeWordConfirm();
  const toast = useToast();
  const [deleteKey, deleteStatus] = useServiceApiKeyDeleteMutation();
  const delete2FA = useCheck2FA({
    status: deleteStatus,
  });

  const handleDeleteWrapper = async (args: ServiceApiKeyDeletePayload) => {
    const result = await deleteKey(args);
    'error' in result
      ? refetchIfDesynchronized(result as BackendErrorResponse)
      : toast.success(t('management:api-keys.delete-api-key-toast'));
  };

  return (
    <ApiKey>
      <ZigTypography
        variant='h3'
        sx={{ mb: 1.5 }}
        id={`service-api__api-key-alias-${apiKey.id}`}
      >
        {apiKey.alias}
      </ZigTypography>
      <Box sx={{ flexDirection: 'row', display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 5, mr: 2 }}>
          <ZigCopyText
            id={`service-api__input-api-key-${apiKey.id}`}
            copyElementId={`service-api__copy-api-key-${apiKey.id}`}
            label={t('api-keys.api-key')}
            value={apiKey.key}
            onCopied={() => toast.success(t('action:copied'))}
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <ZigTypography
            color={'neutral200'}
            id={`service-api__api-key-permissions-label-${apiKey.id}`}
          >
            {t('api-keys.permission-label')}
          </ZigTypography>
          <TextWrapperRow>
            <ZigTypography
              color={'neutral100'}
              id={`service-api__api-key-permissions-${apiKey.id}`}
            >
              {addReadIfMissing(apiKey.permissions).map((p, index) => (
                <span
                  id={`service-api__api-key-permissions-${
                    apiKey.id
                  }-${p.toLowerCase()}`}
                  key={p.toLowerCase()}
                >
                  {i18n.exists(`management:api-keys.permissions.${p}`)
                    ? t(`api-keys.permissions.${p}`)
                    : p}
                  {index !== addReadIfMissing(apiKey.permissions).length - 1 &&
                    ', '}
                </span>
              ))}
            </ZigTypography>
          </TextWrapperRow>
        </Box>
        <Box sx={{ flex: 2 }}>
          <ZigTypography
            color={'neutral200'}
            id={`service-api__api-key-restrictions-${apiKey.id}`}
          >
            {t('api-keys.ip-restrictions')}
          </ZigTypography>
          <TextWrapperRow>
            <ZigTypography color={'neutral100'}>
              {apiKey.ips.map((el, index) => (
                <span
                  id={`service-api__api-key-restrictions-${apiKey.id}-${index}`}
                  key={el}
                >
                  {el}
                  {index !== apiKey.ips.length - 1 && ', '}
                </span>
              )) || t('api-keys.ip-restrictions-none')}
            </ZigTypography>
          </TextWrapperRow>
        </Box>
        <Box
          sx={{
            alignSelf: 'center',
          }}
        >
          <ZigButton
            id={`service-api__api-key-edit-${apiKey.id}`}
            sx={{ mr: 2 }}
            onClick={() => showModal(EditApiKey, { apiKey, serviceId })}
            startIcon={<EditIcon sx={{ width: '12px', height: '12px' }} />}
            variant={'outlined'}
          >
            {t('action:edit')}
          </ZigButton>
          <ZigButton
            id={`service-api__api-key-delete-${apiKey.id}`}
            sx={{ mr: 2 }}
            onClick={() =>
              askConfirm({
                title: t('api-keys.delete-title', {
                  title: apiKey.alias,
                }),
                safeWord: t('action:delete').toUpperCase(),
                yesLabel: t('action:delete').toUpperCase(),
                yesButtonProps: {
                  color: 'danger',
                },
                description: t('api-keys.delete-description'),
                cancelButton: false,
                yesAction: () => {
                  delete2FA((code) =>
                    handleDeleteWrapper({ serviceId, keyId: apiKey.id, code }),
                  );
                },
                prefixId: `delete-api-key-modal`,
              })
            }
            color={'danger'}
            startIcon={<DeleteIcon sx={{ width: '12px', height: '12px' }} />}
            variant={'outlined'}
          >
            {t('action:delete')}
          </ZigButton>
        </Box>
      </Box>
    </ApiKey>
  );
};

export default ApiKeyEntry;
