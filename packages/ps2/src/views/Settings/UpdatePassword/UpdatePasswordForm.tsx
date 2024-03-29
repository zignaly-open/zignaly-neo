import React from 'react';
import {
  ZigAlertMessage,
  ZigButton,
  ZigInput,
  ZigModalForm,
  ZigModalActions,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePasswordMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { UpdatePasswordValidation } from './validations';
import { UpdatePasswordFormType } from './types';
import { useCheck2FA, useLogout } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';

const UpdatePasswordForm = () => {
  const { t } = useTranslation('settings');
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
  } = useForm<UpdatePasswordFormType>({
    mode: 'all',
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
      <ZigModalForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <ZigInput
              id={'update-password__current-password'}
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
              id={'update-password__new-password'}
              label={t('update-password.new-password')}
              placeholder={t('update-password.new-password')}
              error={t(errors.newPassword?.message)}
              helperText={
                <ZigAlertMessage
                  id={'update-password__password-requirements'}
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

        <ZigModalActions>
          <ZigButton
            id={'update-password__submit'}
            type='submit'
            variant='contained'
            size='xlarge'
            loading={updatePasswordStatus.isLoading}
            disabled={!isValid}
          >
            {t('update-password.title')}
          </ZigButton>
        </ZigModalActions>
      </ZigModalForm>
    </>
  );
};

export default UpdatePasswordForm;
