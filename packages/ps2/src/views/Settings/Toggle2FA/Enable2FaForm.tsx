import React from 'react';
import { Link } from '@mui/material';
import {
  ZigButton,
  ZigCopyText,
  ZigInput,
  ZigLink,
  ZigTypography,
} from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEnable2FAMutation, useLazyEnable2FAInfoQuery } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { QRCode } from './styles';
import { TwoFAValidation } from './validations';
import { TwoFAFormType } from './types';
import { Form, ModalActions } from 'components/ZModal';
import { useToast } from 'util/hooks/useToast';
import { useLogout } from 'apis/user/use';
import {
  DOWNLOAD_GOOGLE_AUTHENTICATOR_URL,
  HELP_CREATE_ENABLE_2FA_URL,
} from 'util/constants';

const Enable2FAForm = ({ close }: { close: () => void }) => {
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
  const [load2FAInfo, load2FAInfoResult] = useLazyEnable2FAInfoQuery();
  const [enable2FA, enable2FAStatus] = useEnable2FAMutation();
  const toast = useToast();
  const logout = useLogout(false);

  const onSubmit = (data: TwoFAFormType) => {
    enable2FA(data)
      .unwrap()
      .then(() => {
        setTimeout(() => {
          toast.success(t('enable-2fa.success'));
          logout();
        });
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

  if (!load2FAInfoResult.isFetching && load2FAInfoResult.data) {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ZigTypography whiteSpace='pre-line' textAlign={'center'}>
            <Trans i18nKey='enable-2fa.setup-description' t={t}>
              <ZigLink href={DOWNLOAD_GOOGLE_AUTHENTICATOR_URL} />
            </Trans>
          </ZigTypography>
          <QRCode aria-labelledby='QR Code' src={load2FAInfoResult.data[1]} />

          <ZigTypography color='yellow' textAlign={'center'}>
            {t('enable-2fa.key-phrase-info')}
          </ZigTypography>
          <ZigCopyText
            label={t('enable-2fa.key-phrase')}
            value={load2FAInfoResult.data[0]}
            onCopied={() => {
              toast.success(t('enable-2fa.key-phrase-copied'));
            }}
          />
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <ZigInput
                label={
                  <div>
                    {t('enable-2fa.enter-code')}
                    <ZigTypography variant='h4' color='neutral400'>
                      {t('enable-2fa.enter-code-subtitle')}
                    </ZigTypography>
                  </div>
                }
                placeholder={t('enable-2fa.code-2fa')}
                error={t(errors.code?.message)}
                type='text'
                {...field}
              />
            )}
          />

          <ModalActions>
            <ZigButton
              id={'enable-2fa__submit'}
              type='submit'
              variant='contained'
              size='xlarge'
              loading={enable2FAStatus.isLoading}
              disabled={!isValid}
            >
              {t('enable-2fa.enable-2fa')}
            </ZigButton>
          </ModalActions>
        </Form>
      </>
    );
  }

  return (
    <Form>
      <ZigTypography color='neutral300' textAlign={'center'}>
        <Trans i18nKey='enable-2fa.description' t={t}>
          <Link
            href={HELP_CREATE_ENABLE_2FA_URL}
            target='_blank'
            rel='noopener'
            underline={'none'}
          />
        </Trans>
      </ZigTypography>

      <ModalActions align='center'>
        <ZigButton
          onClick={() => load2FAInfo()}
          loading={load2FAInfoResult.isLoading || load2FAInfoResult.isFetching}
          variant='contained'
          size='xlarge'
          id='enable-2fa__setup'
        >
          {t('enable-2fa.setup-2fa')}
        </ZigButton>
      </ModalActions>
    </Form>
  );
};

export default Enable2FAForm;
