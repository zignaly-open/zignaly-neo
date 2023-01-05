import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../../components/ZModal';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateKeyValidation } from '../validations';

function CreateApiKeysModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['management']);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CreateKeyValidation),
    defaultValues: {
      name: '',
    },
  });

  const isCreating = false;

  const onSubmit = () => {
    alert('privet');
  };

  return (
    <ZModal wide {...props} close={close} title={t('api-keys.create-new-key')}>
      <ZigTypography>{t('api-keys.create-new-key-description')}</ZigTypography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
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
              error={t(errors.name?.message)}
              {...field}
            />
          )}
        />

        <Box sx={{ textAlign: 'center' }}>
          <ZigButton variant={'contained'} type='submit' size={'large'}>
            {t('actions:continue')}
          </ZigButton>
        </Box>
      </form>
    </ZModal>
  );
}

CreateApiKeysModal.trackId = 'api-key-create';

export default CreateApiKeysModal;
