import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, Action, TitleHead, StyledErrorOutline } from './styles';
import { SignupValidation } from './validations';
import { useSignup } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../../../routes';
import {
  Button,
  ErrorMessage,
  IconButton,
  TextButton,
  Typography,
  ZigInput,
} from '@zignaly-open/ui';
import { Box, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginPayload } from '../../../../apis/user/types';
import Cookies from 'js-cookie';
import Mailcheck from 'react-mailcheck';

const SignupForm: React.FC = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
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
  const [{ loading: signingUp }, signup] = useSignup();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const { state: locationState } = useLocation();

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('invite');
    if (ref) {
      Cookies.set('ref', ref);
    }
  }, []);

  const onSubmit = (payload: LoginPayload) => {
    signup({
      ...payload,
      ref: Cookies.get('ref'),
    });
  };

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <TitleHead>
        <Typography variant={'h2'}>{t('signup-title')}</Typography>
      </TitleHead>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Mailcheck email={email}>
          {(suggested: { full: string }) => (
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
                  helperText={
                    suggested ? (
                      <ErrorMessage
                        text={t('error:error.did-you-mean', {
                          suggested: suggested.full,
                        })}
                      />
                    ) : null
                  }
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    setEmail(e.target.value);
                  }}
                />
              )}
            />
          )}
        </Mailcheck>

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              id={'login__password'}
              label={t('login-form.inputText.password.label') + ':'}
              placeholder={t('login-form.inputText.password.label')}
              disabled={signingUp}
              error={t(errors.password?.message)}
              helperText={
                <Box display='flex' alignItems='center'>
                  <StyledErrorOutline height='24px' width='24px' />
                  <Typography
                    variant='body2'
                    color='neutral200'
                    weight='regular'
                  >
                    {t('error:error.password-requirements', {
                      length: 8,
                    })}
                  </Typography>
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
        <Typography
          marginTop={3}
          variant='h4'
          color='neutral300'
          component='h4'
        >
          <Trans i18nKey='signup-form.accept-terms' t={t}>
            <Link
              href='https://zignaly.com/legal/terms'
              target='_blank'
              rel='noopener'
            />
            <Link
              href='https://zignaly.com/legal/privacy'
              target='_blank'
              rel='noopener'
            />
          </Trans>
        </Typography>

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
            onClick={() => navigate(ROUTE_LOGIN, { state: locationState })}
            caption={t('signup-form.link.login')}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default SignupForm;
