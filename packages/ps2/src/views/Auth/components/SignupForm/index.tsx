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
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginPayload } from '../../../../apis/user/types';
import Cookies from 'js-cookie';
import Mailcheck from 'react-mailcheck';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import LockIcon from '@mui/icons-material/Lock';

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
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('invite');
    const subtrack = params.get('subtrack');
    if (ref) {
      Cookies.set('ref', subtrack ? `${ref}:${subtrack}` : ref);
    }
  }, []);

  const onSubmit = (payload: LoginPayload) => {
    signup({
      ...payload,
      ref: Cookies.get('ref'),
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        pt: 2,
        pb: 2,
        pr: 1,
        pl: 1,
        maxWidth: 500,
        background:
          'linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%)',
        border: '1px solid #2a283a',
        borderRadius: '5px',
      }}
    >
      <Box
        display={'flex'}
        height={'10px'}
        width={'100%'}
        borderRadius={'3px'}
        borderColor={'rgb(41,24,73)'}
        sx={{
          background: '#b7bac7',
          border: '2px solid #150448',
        }}
        marginBottom={'20px'}
      >
        <Box
          flex={3}
          height={'100%'}
          borderRadius={'2px'}
          sx={{
            background:
              'linear-gradient(100.88deg, #3F3BB1 6.99%, #138EA0 93.63%)',
          }}
        />
        <Box flex={1} height={'100%'} />
      </Box>
      <Box sx={{ pl: 4, pr: 4 }}>
        <TitleHead>
          <ZigTypography variant={'h1'} fontWeight={700}>
            {t('signup-title')}
          </ZigTypography>
        </TitleHead>
        <TitleHead>
          <ZigTypography variant={'h2'}>
            <Trans i18nKey={'signup-description'} t={t}>
              <Link
                href={'#'}
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
                  startAdornment: (
                    <InputAdornment
                      position='start'
                      sx={{ marginRight: '10px', marginLeft: '-10px' }}
                    >
                      <PasswordOutlinedIcon color={'secondary'} />
                    </InputAdornment>
                  ),
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
          <Box display={'flex'} width={'100%'} justifyContent={'center'}>
            <ZigTypography
              marginTop={2}
              variant={'h3'}
              color={'neutral300'}
              textAlign={'center'}
              maxWidth={'300px'}
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
          </Box>

          <Action>
            <Button
              type={'submit'}
              variant={'primary'}
              id={'signup__submit'}
              caption={t('signup-form.submit')}
              size={'xlarge'}
              loading={signingUp}
              minWidth={400}
            />
          </Action>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'5px'}
          >
            <LockIcon color={'secondary'} fontSize={'small'} />
            <ZigTypography
              variant={'h3'}
              color={'neutral300'}
              textAlign={'center'}
              marginTop={'5px'}
              sx={{ verticalAlign: 'middle', display: 'inline' }}
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
    </Box>
  );
};

export default SignupForm;
