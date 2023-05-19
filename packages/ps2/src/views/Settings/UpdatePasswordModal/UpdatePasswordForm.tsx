import React from 'react';
import { Box } from '@mui/material';
import {
  ZigAlertMessage,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePasswordMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { UpdatePasswordValidation } from './validations';
import { UpdatePasswordFormType } from './types';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
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
    mode: 'onChange',
    resolver: yupResolver(UpdatePasswordValidation),
  });
  const [updatePassword, updatePasswordStatus] = useUpdatePasswordMutation();
  const check2FA = useCheck2FA({
    status: updatePasswordStatus,
  });
  const logout = useLogout(false);
  const toast = useToast();

  const onSubmit = (data: UpdatePasswordFormType) => {
    check2FA((code) => {
      updatePassword({ ...data, code })
        .unwrap()
        .then(() => {
          toast.success(t('update-password.success'));
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
              type={'password'}
              sensitive
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
                <ZigAlertMessage
                  text={t('error:error.password-requirements', {
                    length: 8,
                  })}
                />
              }
              sensitive
              type={'password'}
              {...field}
            />
          )}
        />

        <ModalActions align='right'>
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
        </ModalActions>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
