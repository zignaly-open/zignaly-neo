import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action } from './styles';
import { LoginValidation } from './validations';
import { useAuthenticate } from '../../features/auth/use';
import { useNavigate } from 'react-router-dom';
import {
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_SIGNUP,
} from '../../routes';
import { Button, InputText, TextButton, Typography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { LoginPayload } from '../../features/auth/types';

const LoginForm: React.FC = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
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
    authenticate(data).then(() => navigate(ROUTE_DASHBOARD));
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
              value={field.value}
              disabled={loggingIn}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={t(errors.email?.message)}
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
                text: t('login-form.inputText.password.labelForgot'),
                onClick: () => navigate(ROUTE_FORGOT_PASSWORD),
              }}
              value={field.value}
              placeholder={''}
              disabled={loggingIn}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={t(errors.password?.message)}
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
