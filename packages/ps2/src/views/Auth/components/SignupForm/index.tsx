import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import {
  Form,
  Action,
  TitleHead,
  StyledErrorOutline,
  Wrapper,
  LineBox,
  ColouredLine,
} from './styles';
import { SignupValidation } from './validations';
import { useSignup } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../../../routes';
import {
  ErrorMessage,
  TextButton,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, InputAdornment, Link } from '@mui/material';
import { LoginPayload } from '../../../../apis/user/types';
import Cookies from 'js-cookie';
import Mailcheck from 'react-mailcheck';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PasswordVisibilityAdornment from '../atoms/PasswordVisibilityAdornment';

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

  const onSubmit = (payload: LoginPayload) => {
    signup({
      ...payload,
      ref: Cookies.get('ref'),
      subtrack: Cookies.get('subtrack'),
    });
  };

  return (
    <Wrapper>
      <LineBox>
        <ColouredLine />
        <Box flex={1} height={'100%'} />
      </LineBox>
      <Box padding={'0 32px'}>
        <TitleHead>
          <ZigTypography variant={'h1'} fontWeight={700}>
            {t('signup-title')}
          </ZigTypography>
        </TitleHead>
        <TitleHead>
          <ZigTypography variant={'h2'}>
            <Trans i18nKey={'signup-description'} t={t}>
              <Link
                underline={'always'}
                sx={{
                  color: 'neutral000',
                  textUnderlineOffset: '10px',
                  textDecorationColor: '#E1E9F0',
                }}
              />
            </Trans>
          </ZigTypography>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position='start'
                          sx={{ marginRight: '10px', marginLeft: '-10px' }}
                        >
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
                id={'login__password'}
                label={t('login-form.inputText.password.label') + ':'}
                placeholder={t('login-form.inputText.password.label')}
                disabled={signingUp}
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
                  startAdornment: (
                    <InputAdornment
                      position='start'
                      sx={{ marginRight: '10px', marginLeft: '-10px' }}
                    >
                      <PasswordOutlinedIcon color={'secondary'} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <PasswordVisibilityAdornment
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                    />
                  ),
                }}
                {...field}
              />
            )}
          />
          <ZigTypography
            variant='h4'
            color='neutral300'
            component='h4'
            align={'center'}
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
          </ZigTypography>

          <Action>
            <ZigButton
              type={'submit'}
              variant={'contained'}
              id={'signup__submit'}
              size={'large'}
              loading={signingUp}
              fullWidth={true}
              sx={{ padding: '19px 0', borderRadius: '5px' }}
            >
              <ZigTypography
                variant={'h3'}
                letterSpacing={1.2}
                fontWeight={600}
                textTransform={'uppercase'}
              >
                {t('signup-form.submit')}
              </ZigTypography>
            </ZigButton>
          </Action>
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
            >
              {t('signup-protect')}
            </ZigTypography>
          </Box>
          <TextButton
            id={'signup__login'}
            onClick={() => navigate(ROUTE_LOGIN, { state: locationState })}
            caption={t('signup-form.link.login')}
          />
        </Form>
      </Box>
    </Wrapper>
  );
};

export default SignupForm;
