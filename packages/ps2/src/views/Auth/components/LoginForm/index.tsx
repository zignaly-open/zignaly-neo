import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action, TitleHead } from './styles';
import { LoginValidation } from './validations';
import { useAuthenticate } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNUP } from '../../../../routes';
import { Button, TextButton, Typography, ZigInput } from '@zignaly-open/ui';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { LoginPayload } from '../../../../apis/user/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm: React.FC = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: process.env.REACT_APP_TESTING_DEFAULT_EMAIL || '',
      password: process.env.REACT_APP_TESTING_DEFAULT_PASSWORD || '',
    },
    resolver: yupResolver(LoginValidation),
  });
  const [{ loading: loggingIn }, authenticate] = useAuthenticate();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const submit = (data: LoginPayload) => {
    authenticate(data).catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      setError('email', { type: 'server', message: e.message });
      setError('password', { type: 'server', message: e.message });
    });
  };

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <TitleHead>
        <Typography variant={'h2'}>{t('log-in-title')}</Typography>
      </TitleHead>
      <Form onSubmit={handleSubmit(submit)}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              id={'login__username'}
              label={t('login-form.inputText.email.label') + ':'}
              placeholder={t('login-form.inputText.email.label')}
              disabled={loggingIn}
              error={t(errors.email?.message)}
              {...field}
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              id={'login__password'}
              labelAction={{
                tabIndex: -1,
                text: t('login-form.inputText.password.labelForgot'),
                onClick: () => navigate(ROUTE_FORGOT_PASSWORD),
              }}
              label={t('login-form.inputText.password.label') + ':'}
              placeholder={t('login-form.inputText.password.label')}
              disabled={loggingIn}
              error={t(errors.password?.message)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
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
            id={'login__submit'}
            caption={t('login-form.submit')}
            size={'xlarge'}
            loading={loggingIn}
          />

          <TextButton
            id={'login__signup'}
            onClick={() => navigate(ROUTE_SIGNUP, { state: locationState })}
            caption={t('login-form.link.signup')}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default LoginForm;
