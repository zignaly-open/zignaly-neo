import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action, TitleHead, StyledErrorOutline } from './styles';
import { ResetPasswordValidation } from './validations';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(ResetPasswordValidation),
    defaultValues: {
      password: '',
    },
  });
  const [resetPassword, resetPasswordStatus] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const toast = useToast();

  const onSubmit = async ({ password }: { password: string }) => {
    await resetPassword({
      password,
      token,
    });

    toast.success(t('reset-password.reset-password-success'));
    navigate(ROUTE_LOGIN);
  };

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <TitleHead>
        <ZigTypography variant={'h2'}>
          {t('reset-password.reset-password')}
        </ZigTypography>
      </TitleHead>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              label={t('reset-password.new-password')}
              placeholder={t('reset-password.new-password')}
              disabled={resetPasswordStatus.isLoading}
              error={t(errors.password?.message)}
              helperText={
                <Box display='flex' alignItems='center'>
                  <StyledErrorOutline height='24px' width='24px' />
                  <ZigTypography variant='body2' color='neutral200'>
                    {t('error:error.password-requirements', {
                      length: 8,
                    })}
                  </ZigTypography>
                </Box>
              }
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      icon={
                        showPassword ? (
                          <Visibility sx={{ color: 'neutral200' }} />
                        ) : (
                          <VisibilityOff sx={{ color: 'neutral200' }} />
                        )
                      }
                      variant='flat'
                    />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <Action>
          <Button
            type={'submit'}
            variant={'primary'}
            caption={t('reset-password.reset-password')}
            size={'xlarge'}
            loading={resetPasswordStatus.isLoading}
            disabled={!isValid}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default ResetPasswordForm;
