import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import { Button, InputText, Typography } from '@zignaly-open/ui';
import { useModal } from 'mui-modal-provider';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import TransferZigModal from '../TransferZig';
import { RedeemCodeProps } from './types';
import * as yup from 'yup';
import { CHECK_CODE } from 'queries/codes';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Alert } from '@mui/material';
import RedeemCodeConfirmation from './RedeemCodeConfirmation';

const RedeemCode = (props: RedeemCodeProps) => {
  const { t } = useTranslation('redeem-code');
  const { showModal } = useModal();
  const [checkCode, { error, loading }] = useLazyQuery(CHECK_CODE);
  const [codeInfo, setCodeInfo] = useState();
  console.log(codeInfo);

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
    const { data } = await checkCode({ variables: { code } });
    setCodeInfo(data.checkCode);
  };

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('redeem-code')}
      {...props}
    >
      {codeInfo ? (
        <RedeemCodeConfirmation
          code={codeInfo.code}
          balance={codeInfo.balance}
          deposits={codeInfo.deposits}
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
            mt='24px'
            justifyContent='center'
            flexDirection='column'
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
            {error && <Alert color={'error'}>{error.message}</Alert>}
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
