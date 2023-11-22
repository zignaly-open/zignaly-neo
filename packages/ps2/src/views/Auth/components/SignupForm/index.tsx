import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import {
  Form,
  Action,
  Wrapper,
  LineBox,
  ColouredLine,
  WrapperPlain,
} from './styles';
import { SignupValidation } from './validations';
import { useSignup } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../../../routes';
import {
  ErrorMessage,
  ZigAlertMessage,
  ZigButton,
  ZigInput,
  ZigTypography,
  ZigLink,
} from '@zignaly-open/ui';
import { Box, InputAdornment, Link, useTheme } from '@mui/material';
import { LoginPayload } from '../../../../apis/user/types';
import Cookies from 'js-cookie';
import Mailcheck from 'react-mailcheck';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { whitelabel } from '../../../../whitelabel';

const SignupForm: React.FC<{ plain?: boolean }> = ({ plain }) => {
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
  const theme = useTheme();
  const [{ loading: signingUp }, signup] = useSignup();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const { state: locationState } = useLocation();

  const onSubmit = (payload: LoginPayload) => {
    signup({
      ...payload,
      ref: Cookies.get('ref'),
      subtrack: Cookies.get('subtrack'),
    });
  };

  const FormWrapper = plain ? WrapperPlain : Wrapper;

  return (
    <FormWrapper>
      {!plain && (
        <LineBox>
          <ColouredLine />
          <Box flex={1} height={'100%'} />
        </LineBox>
      )}

      <Box padding={'0 32px'}>
        <ZigTypography variant={'h1'} align={'center'} id={'signup__title'}>
          {t('signup-title')}
        </ZigTypography>
        {!plain && (
          <ZigTypography
            variant={'h2'}
            align={'center'}
            id={'signup__description'}
          >
            <Trans i18nKey={'signup-description'} t={t}>
              <Link
                underline={'always'}
                sx={{
                  color: 'neutral000',
                  textUnderlineOffset: '10px',
                  textDecorationColor: theme.palette.neutral000,
                }}
              />
            </Trans>
          </ZigTypography>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Mailcheck email={email}>
            {(suggested: { full: string }) => (
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ZigInput
                    id={'signup__input-email'}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutlinedIcon color={'secondary'} />
                        </InputAdornment>
                      ),
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
                id={'signup__input-password'}
                sensitive
                label={t('login-form.inputText.password.label') + ':'}
                placeholder={t('login-form.inputText.password.label')}
                disabled={signingUp}
                error={t(errors.password?.message)}
                type={'password'}
                helperText={
                  <ZigAlertMessage
                    id={'signup__input-password-requirements'}
                    text={t('error:error.password-requirements', {
                      length: 8,
                    })}
                  />
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PasswordOutlinedIcon color={'secondary'} />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <ZigTypography
            marginTop={3}
            variant='h4'
            color='neutral300'
            component='h4'
            textAlign={'center'}
            id={'signup__accept-terms-and-conditions-label'}
          >
            <Trans i18nKey='signup-form.accept-terms' t={t}>
              <ZigLink
                href={
                  whitelabel.links?.tos || 'https://zignaly.com/legal/terms'
                }
                target='_blank'
                rel='noopener'
              />
              <ZigLink
                href={
                  whitelabel.links?.privacyPolicy ||
                  'https://zignaly.com/legal/privacy'
                }
                target='_blank'
                rel='noopener'
              />
            </Trans>
          </ZigTypography>

          <Action>
            <ZigButton
              type={'submit'}
              variant={'contained'}
              id={'signup__submit'}
              size={'xlarge'}
              loading={signingUp}
              fullWidth={!plain}
            >
              {t('signup-form.submit')}
            </ZigButton>
          </Action>

          {!plain && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              <LockIcon color={'secondary'} fontSize={'small'} />
              <ZigTypography
                variant={'h3'}
                color={'neutral300'}
                textAlign={'center'}
                marginTop={'5px'}
                id={'signup__protect-label'}
              >
                {t('signup-protect')}
              </ZigTypography>
            </Box>
          )}
          <ZigButton
            variant={'text'}
            id={'signup__login'}
            onClick={() => navigate(ROUTE_LOGIN, { state: locationState })}
          >
            {t('signup-form.link.login')}
          </ZigButton>
        </Form>
      </Box>
    </FormWrapper>
  );
};

export default SignupForm;
