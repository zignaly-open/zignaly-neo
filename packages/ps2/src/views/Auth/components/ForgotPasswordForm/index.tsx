import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, TitleHead } from './styles';
import { ForgotPasswordValidation } from './validations';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../routes';
import { Button, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useResetPasswordRequestMutation } from 'apis/user/api';
import AnchorLink from 'components/AnchorLink';

const ForgotPasswordForm = () => {
  const { t } = useTranslation(['auth', 'error']);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(ForgotPasswordValidation),
  });
  const [resetPassword, resetPasswordStatus] =
    useResetPasswordRequestMutation();

  const submit = (data: { email: string }) => {
    resetPassword(data);
  };

  if (resetPasswordStatus.isSuccess) {
    return (
      <Box
        sx={{ width: '100%', p: 4, maxWidth: 700 }}
        gap={4.75}
        display='flex'
        flexDirection='column'
      >
        <TitleHead>
          <ZigTypography variant='h2'>
            {t('reset-password.reset-password')}
          </ZigTypography>
        </TitleHead>
        <ZigTypography textAlign='center'>
          {t('reset-password.email-sent')}
        </ZigTypography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <TitleHead>
        <ZigTypography variant={'h2'}>
          {t('reset-password.reset-password')}
        </ZigTypography>
      </TitleHead>
      <Form onSubmit={handleSubmit(submit)}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInput
              label={t('login-form.inputText.email.label') + ':'}
              placeholder={t('login-form.inputText.email.label')}
              disabled={resetPasswordStatus.isLoading}
              error={t(errors.email?.message)}
              {...field}
            />
          )}
        />

        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          mt={2.5}
          gap={5}
        >
          <Button
            type={'submit'}
            variant={'primary'}
            caption={t('reset-password.send-instructions')}
            size={'xlarge'}
            loading={resetPasswordStatus.isLoading}
            disabled={!isValid}
            id='forgotpassword__submit'
          />
          <Box display='flex' flexDirection='column' alignItems='center'>
            <ZigTypography variant='body2' fontWeight={500}>
              {t('reset-password.found-password')}
            </ZigTypography>
            <ZigTypography variant='body2'>
              <Trans
                i18nKey={'reset-password.login-signup'}
                t={t}
                components={[
                  <AnchorLink to={ROUTE_LOGIN} key='login' />,
                  <AnchorLink to={ROUTE_SIGNUP} key='signup' />,
                ]}
              />
            </ZigTypography>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default ForgotPasswordForm;
