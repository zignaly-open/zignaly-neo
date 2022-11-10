import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action, TitleHead } from './styles';
import { SignupValidation } from './validations';
import { useAuthenticate } from '../../../../apis/user/use';
import { useNavigate } from 'react-router-dom';
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from '../../../../routes';
import { Button, TextButton, Typography, ZigInput } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { LoginPayload } from '../../../../apis/user/types';

const SignupForm: React.FC = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(SignupValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [{ loading: signingUp }, authenticate] = useAuthenticate();
  const navigate = useNavigate();

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
        <Typography variant={'h2'}>{t('signup-title')}</Typography>
      </TitleHead>
      <Form onSubmit={handleSubmit(submit)}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              id={'signup'}
              label={t('login-form.inputText.email.label') + ':'}
              placeholder={t('login-form.inputText.email.label')}
              disabled={signingUp}
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
              label={t('login-form.inputText.password.label') + ':'}
              type={'password'}
              placeholder={t('login-form.inputText.password.label')}
              disabled={signingUp}
              error={t(errors.password?.message)}
              {...field}
            />
          )}
        />

        <Action>
          <Button
            type={'submit'}
            variant={'primary'}
            id={'signup__submit'}
            caption={t('signup-form.submit')}
            size={'xlarge'}
            loading={signingUp}
          />

          <TextButton
            id={'signup__login'}
            onClick={() => navigate(ROUTE_LOGIN)}
            caption={t('signup-form.link.login')}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default SignupForm;
