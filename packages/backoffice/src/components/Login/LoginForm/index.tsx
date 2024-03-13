import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action } from './styles';
import { LoginValidation } from './validations';
import { ZigTypography, ZigInput, ZigButton } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { LoginPayload } from './types';
import { useAuthenticate } from '../../../apis/session/use';

const LoginForm: React.FC = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
    defaultValues: {
      email:
        (process.env.NODE_ENV === 'development' &&
          process.env.REACT_APP_TESTING_DEFAULT_EMAIL) ||
        '',
      password:
        (process.env.NODE_ENV === 'development' &&
          process.env.REACT_APP_TESTING_DEFAULT_PASSWORD) ||
        '',
    },
    resolver: yupResolver(LoginValidation),
  });

  const [{ loading: loggingIn }, authenticate] = useAuthenticate();

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
      <ZigTypography variant={'h1'} align={'center'}>
        {t('log-in-title')}
      </ZigTypography>
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
              label={t('login-form.inputText.password.label') + ':'}
              placeholder={t('login-form.inputText.password.label')}
              disabled={loggingIn}
              error={t(errors.password?.message)}
              type={'password'}
              sensitive
              {...field}
            />
          )}
        />

        <Action>
          <ZigButton
            type={'submit'}
            variant={'contained'}
            id={'login__submit'}
            size={'xlarge'}
            loading={loggingIn}
          >
            {t('login-form.submit')}
          </ZigButton>
        </Action>
      </Form>
    </Box>
  );
};

export default LoginForm;
