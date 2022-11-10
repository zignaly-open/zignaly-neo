import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, Action, TitleHead } from './styles';
import { SignupValidation } from './validations';
import { useSignup } from '../../../../apis/user/use';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../../../routes';
import { Button, TextButton, Typography, ZigInput } from '@zignaly-open/ui';
import { Box, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginPayload } from '../../../../apis/user/types';

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

  const submit = (data: LoginPayload) => {
    signup(data);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

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
              placeholder={t('login-form.inputText.password.label')}
              disabled={signingUp}
              error={t(errors.password?.message)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={handleShowPassword}
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
        <Typography
          marginTop={3}
          variant='h4'
          color='neutral300'
          component='h4'
        >
          <Trans i18nKey='signup-form.accept-terms' t={t}>
            <Link href='https://zignaly.com/legal/terms' />
            <Link href='https://zignaly.com/legal/privacy' />
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
            onClick={() => navigate(ROUTE_LOGIN)}
            caption={t('signup-form.link.login')}
          />
        </Action>
      </Form>
    </Box>
  );
};

export default SignupForm;
