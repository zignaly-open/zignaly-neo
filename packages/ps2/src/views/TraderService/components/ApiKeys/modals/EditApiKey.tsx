import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../../components/ZModal';
import { ServiceApiKey } from '../../../../../apis/serviceApiKey/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateKeyValidation } from '../validations';
import {
  CloneIcon,
  dark,
  InputText,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/system';
import copy from 'copy-to-clipboard';
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

function EditApiKeysModal({
  close,
  apiKey,
  ...props
}: {
  apiKey: ServiceApiKey;
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['management']);
  const toast = useToast();
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
  } = useForm<{
    alias: string;
    enableIpRestriction: 'true' | 'false'; // kek
    ipRestrictions: string;
  }>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CreateKeyValidation),
    defaultValues: {
      alias: apiKey.alias,
      enableIpRestriction: 'false',
      ipRestrictions: apiKey.ips.join(' '),
    },
  });

  const onSubmit = () => {
    alert('privet');
  };

  const showIpRestrictions = watch('enableIpRestriction') === 'true';
  const isCreate = true;
  const isCreating = false;

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t(isCreate ? 'api-keys.create-new-key' : 'api-keys.edit-key')}
    >
      {isCreate && (
        <ZigTypography sx={{ mb: 3 }}>
          {t('api-keys.create-new-key-description')}
        </ZigTypography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {!isCreate && (
          <Controller
            name='alias'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigInput
                sx={{
                  mb: 4,
                }}
                wide
                label={t('common:name') + ':'}
                placeholder={t('common:name')}
                disabled={isCreating}
                error={t(errors.alias?.message)}
                {...field}
              />
            )}
          />
        )}

        <Box sx={{ mb: 4 }}>
          <InputText
            placeholder={t('api-keys.api-key')}
            label={t('api-keys.api-key')}
            readOnly={true}
            value={apiKey.key}
            rightSideElement={
              <CloneIcon width={40} height={40} color={dark.neutral300} />
            }
            onClickRightSideElement={() => {
              copy(apiKey.key);
              toast.success(t('actions:copied'));
            }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          {isCreate ? (
            <InputText
              placeholder={t('api-keys.api-secret')}
              label={
                <MultilineLabel
                  title={t('api-keys.api-secret')}
                  subtitle={t('api-keys.api-secret-explainer')}
                />
              }
              readOnly={true}
              value={apiKey.secret}
              rightSideElement={
                <CloneIcon width={40} height={40} color={dark.neutral300} />
              }
              onClickRightSideElement={() => {
                copy(apiKey.secret);
                toast.success(t('actions:copied'));
              }}
            />
          ) : (
            <>
              <MultilineLabel
                title={t('api-keys.api-secret')}
                subtitle={t('api-keys.api-secret-explainer')}
              />
              <Tooltip title={t('api-keys.api-settings-tooltip')}>
                <ZigTypography>********</ZigTypography>
              </Tooltip>
            </>
          )}
        </Box>
        <Box sx={{ mb: 4 }}>
          <ZigTypography>{t('api-keys.api-settings')}</ZigTypography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Tooltip title={t('api-keys.cant-disable-read')}>
                <FormControlLabel
                  control={<Checkbox checked onChange={() => {}} />}
                  label={t('api-keys.permissions-enable.read')}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('api-keys.permissions-enable.canTrade')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('api-keys.permissions-enable.marginTrade')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('api-keys.permissions-enable.futuresTrade')}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: showIpRestrictions ? 1 : 4 }}>
          <ZigTypography>{t('api-keys.restrict-ip')}</ZigTypography>

          <RadioGroup name={'enableIpRestriction'} defaultValue={false}>
            <FormControlLabel
              control={<Radio {...register('enableIpRestriction')} />}
              value={false}
              label={t('api-keys.ip-restrictions-none')}
            />
            <FormControlLabel
              control={<Radio {...register('enableIpRestriction')} />}
              value={true}
              label={t('api-keys.ip-restrictions-on')}
            />
          </RadioGroup>
        </Box>

        {showIpRestrictions && (
          <Box>
            <Controller
              name='ipRestrictions'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigInput
                  sx={{
                    mt: 2,
                    mb: 4,
                  }}
                  multiline
                  rows={2}
                  wide
                  label={
                    <MultilineLabel
                      title={t('api-keys.ip-restrictions-allowed')}
                      subtitle={t('api-keys.ip-restrictions-allowed-explainer')}
                    />
                  }
                  disabled={isCreating}
                  error={t(errors.alias?.message)}
                  {...field}
                />
              )}
            />
          </Box>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <ZigButton variant={'contained'} type='submit' size={'large'}>
            {t('action:save-and-close')}
          </ZigButton>
        </Box>
      </form>
    </ZModal>
  );
}

EditApiKeysModal.trackId = 'api-key-edit';

export default EditApiKeysModal;
