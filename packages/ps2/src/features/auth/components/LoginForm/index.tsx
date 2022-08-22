import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action } from './styles';
import { LoginValidation } from './validations';
import { useAuthenticate } from '../../use';
import { useNavigate } from 'react-router-dom';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNUP } from '../../../../routes';
import { Button, InputText, TextButton, Typography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { LoginPayload } from '../../types';

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
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginValidation),
  });
  const [{ loading: loggingIn }, authenticate] = useAuthenticate();
  const navigate = useNavigate();

  const submit = (data: LoginPayload) => {
    authenticate(data).catch((e) => {
      setError('email', { type: 'server', message: e.message });
      setError('password', { type: 'server', message: e.message });
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 'sm' }}>
      <Typography variant={'h2'}>{t('log-in-title')}</Typography>
      <Form onSubmit={handleSubmit(submit)}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputText
              label={t('login-form.inputText.email.label') + ':'}
              placeholder={''}
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
            <InputText
              label={t('login-form.inputText.password.label') + ':'}
              type={'password'}
              labelAction={{
                tabIndex: -1,
                text: t('login-form.inputText.password.labelForgot'),
                onClick: () => navigate(ROUTE_FORGOT_PASSWORD),
              }}
              placeholder={''}
              disabled={loggingIn}
              error={t(errors.password?.message)}
              {...field}
            />
          )}
        />

        <Action>
          <Button
            type={'submit'}
            variant={'primary'}
            caption={t('login-form.submit')}
            size={'xlarge'}
            loading={loggingIn}
          />

          <TextButton
            onClick={() => navigate(ROUTE_SIGNUP)}
            caption={t('login-form.link.signup')}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default LoginForm;
