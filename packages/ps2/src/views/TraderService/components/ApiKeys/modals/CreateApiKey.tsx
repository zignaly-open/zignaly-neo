import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../../components/ZModal';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateKeyValidation } from '../validations';
import { useServiceApiKeyCreateMutation } from '../../../../../apis/serviceApiKey/api';
import { CreateApiKeyFormType } from '../types';
import { ServiceApiKey } from '../../../../../apis/serviceApiKey/types';

function CreateApiKeysModal({
  close,
  serviceId,
  afterSave,
  ...props
}: {
  serviceId: string;
  afterSave: (result: ServiceApiKey) => void;
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['management']);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateApiKeyFormType>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CreateKeyValidation),
    defaultValues: {
      alias: '',
    },
  });

  const [create, { isLoading: isCreating }] = useServiceApiKeyCreateMutation();

  const onSubmit = async ({ alias }: CreateApiKeyFormType) => {
    const result = await create({ alias, serviceId });
    if (!('error' in result)) {
      afterSave(result.data);
      close();
    }
  };

  return (
    <ZModal wide {...props} close={close} title={t('api-keys.create-new-key')}>
      <ZigTypography>{t('api-keys.create-new-key-description')}</ZigTypography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='alias'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              sx={{
                mt: 2,
                mb: 4,
              }}
              wide
              label={t('common:name') + ':'}
              placeholder={t('common:name') + ':'}
              disabled={isCreating}
              error={t(errors.alias?.message)}
              {...field}
            />
          )}
        />

        <Box sx={{ textAlign: 'center' }}>
          <ZigButton
            disabled={isCreating}
            variant={'contained'}
            type='submit'
            size={'large'}
          >
            {t('action:continue')}
          </ZigButton>
        </Box>
      </form>
    </ZModal>
  );
}

CreateApiKeysModal.trackId = 'api-key-create';

export default CreateApiKeysModal;
