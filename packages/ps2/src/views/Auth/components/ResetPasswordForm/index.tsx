import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action } from './styles';
import { ResetPasswordValidation } from './validations';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ZigAlertMessage,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useResetPasswordMutation } from 'apis/user/api';
import { ROUTE_LOGIN } from 'routes';
import { useToast } from 'util/hooks/useToast';

const ResetPasswordForm = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<{ password: string }>({
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordValidation),
    defaultValues: {
      password: '',
    },
  });
  const [resetPassword, resetPasswordStatus] = useResetPasswordMutation();
  const navigate = useNavigate();
  const { token } = useParams();
  const toast = useToast();

  const onSubmit = async ({ password }: { password: string }) => {
    await resetPassword({
      password,
      token,
    }).unwrap();

    toast.success(t('reset-password.reset-password-success'));
    navigate(ROUTE_LOGIN);
  };

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <ZigTypography
        variant={'h1'}
        textTransform={'capitalize'}
        textAlign={'center'}
      >
        {t('reset-password.reset-password')}
      </ZigTypography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              id={'reset-password__new-password'}
              label={t('reset-password.new-password')}
              placeholder={t('reset-password.new-password')}
              disabled={resetPasswordStatus.isLoading}
              error={t(errors.password?.message)}
              helperText={
                <ZigAlertMessage
                  text={t('error:error.password-requirements', {
                    length: 8,
                  })}
                  id={'reset-password__length-requirements'}
                />
              }
              sensitive
              type={'password'}
              {...field}
            />
          )}
        />

        <Action>
          <ZigButton
            type={'submit'}
            size={'xlarge'}
            loading={resetPasswordStatus.isLoading}
            disabled={!isValid}
            id={'reset-password__submit'}
          >
            {t('reset-password.reset-password')}
          </ZigButton>
        </Action>
      </Form>
    </Box>
  );
};

export default ResetPasswordForm;
