import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, Action, TitleHead } from './styles';
import { LoginValidation } from './validations';
import { useAuthenticate } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNUP } from '../../../../routes';
import { ZigTypography, ZigInput, ZigButton } from '@zignaly-open/ui';
import { Box, Link } from '@mui/material';
import { LoginPayload } from '../../../../apis/user/types';

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
        <ZigTypography variant={'h2'}>{t('log-in-title')}</ZigTypography>
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
                id: 'login__forgot-password',
              }}
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
            id={'login__submit'}
            size={'xlarge'}
            loading={loggingIn}
          >
            {t('login-form.submit')}
          </ZigButton>

          <ZigTypography variant={'body2'} align={'center'}>
            <Trans i18nKey={'login-form.link.signup'} t={t}>
              <Link
                id={'login__signup'}
                sx={{ cursor: 'pointer' }}
                underline={'none'}
                onClick={() => navigate(ROUTE_SIGNUP, { state: locationState })}
              />
            </Trans>
          </ZigTypography>
        </Action>
      </Form>
    </Box>
  );
};

export default LoginForm;
