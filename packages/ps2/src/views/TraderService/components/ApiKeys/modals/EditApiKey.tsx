import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../../components/ZModal';
import {
  ServiceApiKey,
  ServiceApiKeyPermission,
} from '../../../../../apis/serviceApiKey/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { EditKeyValidation } from '../validations';
import {
  ZigButton,
  ZigCopyText,
  ZigInput,
  ZigModalActions,
  ZigModalForm,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/system';
import { useToast } from '../../../../../util/hooks/useToast';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material';
import { MultilineLabel } from '../atoms';
import { useServiceApiKeyEditMutation } from '../../../../../apis/serviceApiKey/api';
import { BooleanString, EditApiKeyFormType } from '../types';
import { formTypeToBackendPayloadType } from '../util';
import { useCheck2FA } from '../../../../../apis/user/use';
import { useRefetchIfDesynchronizedState } from '../../../../../apis/serviceApiKey/use';
import { BackendErrorResponse } from '../../../../../util/errors';

function EditApiKeysModal({
  close,
  apiKey,
  serviceId,
  ...props
}: {
  apiKey: ServiceApiKey;
  serviceId: string;
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['management']);
  const toast = useToast();
  const [updateApiKey, status] = useServiceApiKeyEditMutation();
  const refetchIfDesyncronized = useRefetchIfDesynchronizedState(serviceId);
  const { isLoading } = status;
  const edit2FA = useCheck2FA({
    status,
  });

  const defaultValues = useMemo(
    () => ({
      alias: apiKey.alias,
      // I fucking love radio boxes
      enableIpRestriction: JSON.stringify(
        apiKey.ips.some(Boolean),
      ) as BooleanString,
      ipRestrictions: apiKey.ips.join(', '),
      canTrade: apiKey.permissions?.includes(ServiceApiKeyPermission.canTrade),
      futuresTrade: apiKey.permissions?.includes(
        ServiceApiKeyPermission.futuresTrade,
      ),
    }),
    [],
  );

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors, isValid },
  } = useForm<EditApiKeyFormType>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(EditKeyValidation),
    defaultValues,
  });

  const showIpRestrictions = watch('enableIpRestriction') === 'true';

  const onSubmit = async (data: EditApiKeyFormType) => {
    edit2FA(async (code) => {
      const result = await updateApiKey({
        serviceId,
        keyId: apiKey.id,
        data: { ...formTypeToBackendPayloadType(data), code },
      });
      if (!('error' in result)) {
        toast.success(t('common:changes-saved'));
        close();
      } else {
        refetchIfDesyncronized(result as BackendErrorResponse);
      }
    });
  };

  const isCreate = !!apiKey.secret;

  // since we won't have that in the form
  isCreate && register('alias');

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t(isCreate ? 'api-keys.create-new-key' : 'api-keys.edit-key')}
    >
      {isCreate && (
        <ZigTypography>
          {t('api-keys.create-new-key-description')}
        </ZigTypography>
      )}

      <ZigModalForm onSubmit={handleSubmit(onSubmit)}>
        {!isCreate && (
          <Controller
            name='alias'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigInput
                wide
                label={t('common:name') + ':'}
                placeholder={t('common:name')}
                disabled={isLoading}
                error={t(errors.alias?.message, { maxLength: 30 })}
                {...field}
              />
            )}
          />
        )}

        <ZigCopyText
          label={t('api-keys.api-key')}
          value={apiKey.key}
          onCopied={() => toast.success(t('action:copied'))}
        />
        {isCreate ? (
          <ZigCopyText
            label={
              <MultilineLabel
                title={t('api-keys.api-secret')}
                subtitle={t('api-keys.api-secret-explainer')}
              />
            }
            value={apiKey.secret}
            onCopied={() => toast.success(t('action:copied'))}
          />
        ) : (
          <div>
            <MultilineLabel
              title={t('api-keys.api-secret')}
              subtitle={t('api-keys.api-secret-explainer')}
            />
            <Tooltip title={t('api-keys.api-settings-tooltip')}>
              <ZigTypography>********</ZigTypography>
            </Tooltip>
          </div>
        )}

        <div>
          <ZigTypography>{t('api-keys.api-settings')}</ZigTypography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Tooltip title={t('api-keys.cant-disable-read')}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isLoading}
                      checked
                      onChange={() => {}}
                    />
                  }
                  label={t('api-keys.permissions-enable.read')}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('canTrade')}
                    checked={watch('canTrade')}
                    disabled={isLoading}
                  />
                }
                label={t('api-keys.permissions-enable.canTrade')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('futuresTrade')}
                    checked={watch('futuresTrade')}
                    disabled={isLoading}
                  />
                }
                label={t('api-keys.permissions-enable.futuresTrade')}
              />
            </Grid>
          </Grid>
        </div>

        <div>
          <ZigTypography>{t('api-keys.restrict-ip')}</ZigTypography>

          <RadioGroup
            name={'enableIpRestriction'}
            defaultValue={defaultValues.enableIpRestriction}
          >
            <FormControlLabel
              control={
                <Radio
                  disabled={isLoading}
                  {...register('enableIpRestriction')}
                />
              }
              value={'false'}
              label={t('api-keys.ip-restrictions-none')}
            />
            <FormControlLabel
              control={
                <Radio
                  disabled={isLoading}
                  {...register('enableIpRestriction')}
                />
              }
              value={'true'}
              label={t('api-keys.ip-restrictions-on')}
            />
          </RadioGroup>
          {showIpRestrictions && (
            <Box sx={{ mt: 2 }}>
              <Controller
                name='ipRestrictions'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ZigInput
                    disabled={isLoading}
                    multiline
                    rows={2}
                    wide
                    label={
                      <MultilineLabel
                        title={t('api-keys.ip-restrictions-allowed')}
                        subtitle={t(
                          'api-keys.ip-restrictions-allowed-explainer',
                        )}
                      />
                    }
                    error={t(errors.ipRestrictions?.message, {
                      maxLength: 500,
                    })}
                    {...field}
                  />
                )}
              />
            </Box>
          )}
        </div>

        <ZigModalActions>
          <ZigButton
            id={'api-key__save-and-close'}
            variant={'contained'}
            loading={isLoading}
            disabled={!isValid}
            type='submit'
            size={'large'}
          >
            {t('action:save-and-close')}
          </ZigButton>
        </ZigModalActions>
      </ZigModalForm>
    </ZModal>
  );
}

EditApiKeysModal.trackId = 'api-key-edit';

export default EditApiKeysModal;
