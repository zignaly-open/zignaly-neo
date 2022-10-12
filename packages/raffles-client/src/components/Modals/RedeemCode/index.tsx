import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import { Button, InputText, Typography } from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { RedeemCodeProps } from './types';
import * as yup from 'yup';
import { CHECK_CODE } from 'queries/codes';
import { useLazyQuery } from '@apollo/client';
import RedeemCodeConfirmation from '../RedeemCodeConfirmation';

const RedeemCode = (props: RedeemCodeProps) => {
  const { t } = useTranslation('redeem-code');
  const [checkCode, { error, loading, data }] = useLazyQuery(CHECK_CODE);

  const validationSchema = yup.object({
    code: yup.string().matches(/^[a-z0-9_]{3,20}$/i, t('invalid-code')),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const submit = async ({ code }: { code: string }) => {
    await checkCode({ variables: { code } });
  };

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('redeem-code')}
      {...props}
    >
      {data ? (
        <RedeemCodeConfirmation
          code={data.checkCode.code}
          balance={data.checkCode.balance}
          deposits={data.checkCode.deposits}
          onClose={() => props.onClose(null, 'escapeKeyDown')}
        />
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Box textAlign='center'>
            <Typography variant='body1' color='neutral200' weight='regular'>
              {t('redeem-code-info')}
            </Typography>
          </Box>
          <Box
            display='flex'
            my='24px'
            justifyContent='center'
            flexDirection='column'
            textAlign='center'
          >
            <Box
              display='flex'
              mx='auto'
              mb={1}
              justifyContent='center'
              flexDirection='column'
              maxWidth={220}
            >
              <Controller
                name='code'
                control={control}
                render={({ field }) => (
                  <InputText
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('enter-code')}
                    minHeight={23}
                    error={errors.code?.message}
                  />
                )}
              />
            </Box>
            {error && (
              <Typography variant={'body1'} color='redGraphOrError'>
                {error.message}
              </Typography>
            )}
          </Box>
          <Box display='flex' mt='24px' justifyContent='center'>
            <Button
              size='large'
              caption={t('check')}
              disabled={!isValid}
              loading={loading}
              minWidth={200}
              type='submit'
            />
          </Box>
        </form>
      )}
    </DialogContainer>
  );
};
export default RedeemCode;
