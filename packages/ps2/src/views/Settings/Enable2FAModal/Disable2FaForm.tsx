import React from 'react';
import { Box } from '@mui/material';
import {
  ErrorMessage,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDisable2FAMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { TwoFAValidation } from './validations';
import { TwoFAFormType } from './types';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useToast } from 'util/hooks/useToast';
import { useDispatch } from 'react-redux';
import { enable2FA } from 'apis/user/store';

const Disable2FAForm = ({ close }: { close: () => void }) => {
  const { t } = useTranslation('settings');
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
  } = useForm<TwoFAFormType>({
    mode: 'onChange',
    resolver: yupResolver(TwoFAValidation),
  });
  const [disable2FA, disable2FAStatus] = useDisable2FAMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const onSubmit = (data: TwoFAFormType) => {
    disable2FA(data)
      .unwrap()
      .then(() => {
        toast.success(t('disable-2fa.success'));
        dispatch(enable2FA(false));
        close();
      })
      .catch((e) => {
        if (e.data.error?.code === 37) {
          setError('code', {
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
          {t('disable-2fa.description')}
        </ZigTypography>
      </Box>
      <ErrorMessage text={t('disable-2fa.security')} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='code'
          control={control}
          render={({ field }) => (
            <ZigInput
              label={t('enable-2fa.enter-code')}
              placeholder={t('enable-2fa.code-2fa')}
              error={t(errors.code?.message)}
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
            id={'disable-2fa__submit'}
            type='submit'
            variant='contained'
            size='large'
            loading={disable2FAStatus.isLoading}
            disabled={!isValid}
          >
            {t('disable-2fa.title')}
          </ZigButton>
        </ModalActionsNew>
      </Form>
    </>
  );
};

export default Disable2FAForm;
