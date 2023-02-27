import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  ErrorMessage,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useDisable2FAMutation,
  useUpdatePasswordMutation,
} from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { UpdatePasswordValidation } from './validations';
import { StyledErrorOutline } from '../SignupForm/styles';
import { UpdatePasswordFormType } from './types';
import PasswordVisibilityAdornment from '../atoms/PasswordVisibilityAdornment';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';

const TwoFAForm = ({ close }: { close: () => void }) => {
  const { t } = useTranslation(['auth', 'error']);
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
  const [disable2FA, disable2FAStatus] = useDisable2FAMutation();

  const onSubmit = (data: UpdatePasswordFormType) => {
    disable2FA(data)
      .unwrap()
      .catch((e) => {
        if (e.data.error?.code === 7) {
          setError('password', {
            type: 'notMatch',
            message: t(`error:error.${e.data.error.code}`),
          });
        }
      });
  };

  return (
    <>
      <Box mt={1} mb={1}>
        <ZigTypography whiteSpace='pre-line'>
          {t('enable-2fa.disable-2fa-description')}
        </ZigTypography>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='code'
          control={control}
          render={({ field }) => (
            <ZigInput
              label={t('enable-2fa.code')}
              placeholder={t('enable-2fa.code-2fa')}
              error={t(errors.code?.message)}
              helperText={
                <ErrorMessage text={t('enable-2fa.disable-2fa-security')} />
              }
              type='text'
              {...field}
            />
          )}
        />

        <ModalActionsNew align='right'>
          <ZigButton
            onClick={close}
            variant='outlined'
            size='large'
            id={'disable-2fa__cancel'}
          >
            {t('action:cancel')}
          </ZigButton>
          <ZigButton
            id={'update-password__submit'}
            type='submit'
            variant='contained'
            size='large'
            loading={disable2FAStatus.isLoading}
            disabled={!isValid}
          >
            {t('enable-2fa.disable-2fa')}
          </ZigButton>
        </ModalActionsNew>
      </Form>
    </>
  );
};

export default TwoFAForm;
