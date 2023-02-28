import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePasswordMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { UpdatePasswordValidation } from './validations';
import { StyledErrorOutline } from '../../Auth/components/SignupForm/styles';
import { UpdatePasswordFormType } from './types';
import PasswordVisibilityAdornment from '../../Auth/components/atoms/PasswordVisibilityAdornment';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useCheck2FA, useLogout } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';

const UpdatePasswordForm = ({ close }: { close: () => void }) => {
  const { t } = useTranslation('settings');
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
  } = useForm<UpdatePasswordFormType>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: yupResolver(UpdatePasswordValidation),
  });
  const [updatePassword, updatePasswordStatus] = useUpdatePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const check2FA = useCheck2FA({
    status: updatePasswordStatus,
  });
  const logout = useLogout();
  const toast = useToast();

  const onSubmit = (data: UpdatePasswordFormType) => {
    check2FA((code) => {
      updatePassword({ ...data, code })
        .unwrap()
        .then(() => {
          toast.success(t('enable-2fa.success'));
          logout();
          close();
        })
        .catch((e) => {
          if (e.data.error?.code === 7) {
            setError('password', {
              type: 'notMatch',
              message: t(`error:error.${e.data.error.code}`),
            });
          }
        });
    });
  };

  return (
    <>
      <Box mt={1} mb={1}>
        <ZigTypography whiteSpace='pre-line'>
          {t('update-password.description')}
        </ZigTypography>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <ZigInput
              label={t('update-password.current-password')}
              placeholder={t('update-password.current-password')}
              error={t(errors.password?.message)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
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
        <Controller
          name='newPassword'
          control={control}
          render={({ field }) => (
            <ZigInput
              label={t('update-password.new-password')}
              placeholder={t('update-password.new-password')}
              error={t(errors.newPassword?.message)}
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
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityAdornment
                    show={showNewPassword}
                    onToggle={() => setShowNewPassword(!showNewPassword)}
                  />
                ),
              }}
              {...field}
            />
          )}
        />

        <ModalActionsNew align='right'>
          <ZigButton
            onClick={close}
            variant='outlined'
            size='large'
            id={'update-password__cancel'}
          >
            {t('action:cancel')}
          </ZigButton>
          <ZigButton
            id={'update-password__submit'}
            type='submit'
            variant='contained'
            size='large'
            loading={updatePasswordStatus.isLoading}
            disabled={!isValid}
          >
            {t('update-password.title')}
          </ZigButton>
        </ModalActionsNew>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
