import React, { useState } from 'react';
import {
  ErrorMessage,
  ZigButton,
  ZigInput,
  ZigModalActions,
  ZigModalForm,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDisable2FAMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { TwoFAValidation } from './validations';
import { TwoFAFormType } from './types';
import { useToast } from 'util/hooks/useToast';
import { useDispatch } from 'react-redux';
import { ReactComponent as ShieldIcon } from '../../../images/shield.svg';
import { enable2FA } from 'apis/user/store';
import { Box } from '@mui/material';

const Disable2FAForm = ({ close }: { close: () => void }) => {
  const { t } = useTranslation('settings');
  const [isActiveDisabling, setIsActiveDisabling] = useState(false);
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
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <ShieldIcon />
        <ZigTypography variant={'h1'} id={'two-fa__title'} sx={{ mt: 3 }}>
          {t('disable-2fa.congrats')}
        </ZigTypography>
      </Box>

      <ZigTypography
        color='neutral300'
        sx={{ pb: 4 }}
        component='p'
        textAlign={'center'}
        id={'disable-two-fa_description'}
      >
        {t(
          `disable-2fa.description-${
            !isActiveDisabling ? 'basic' : 'after-click'
          }`,
        )}
      </ZigTypography>
      {!isActiveDisabling ? (
        <Box sx={{ textAlign: 'center', mt: 0.5 }}>
          <ZigButton
            type='submit'
            id={'disable-two-fa__start'}
            variant='outlined'
            color={'danger'}
            size='large'
            onClick={() => setIsActiveDisabling(true)}
          >
            {t('disable-2fa.title')}
          </ZigButton>
        </Box>
      ) : (
        <ZigModalForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <ZigInput
                id={'disable-two-fa_enter-code'}
                label={t('enable-2fa.enter-code')}
                placeholder={t('enable-2fa.code-2fa')}
                error={t(errors.code?.message)}
                type='text'
                {...field}
              />
            )}
          />
          <ErrorMessage
            text={t('disable-2fa.security')}
            id={'disable-two-fa_security'}
          />

          <ZigModalActions>
            <ZigButton
              id={'disable-two-fa__submit'}
              type='submit'
              variant='contained'
              size='xlarge'
              loading={disable2FAStatus.isLoading}
              disabled={!isValid}
            >
              {t('disable-2fa.title')}
            </ZigButton>
          </ZigModalActions>
        </ZigModalForm>
      )}
    </>
  );
};

export default Disable2FAForm;
