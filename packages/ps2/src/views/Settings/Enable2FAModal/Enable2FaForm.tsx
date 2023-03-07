import React from 'react';
import { Box, Link } from '@mui/material';
import {
  IconButton,
  ZigButton,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useEnable2FAMutation,
  useLazyEnable2FAInfoQuery,
} from 'apis/ps2/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form, QRCode } from './styles';
import { TwoFAValidation } from './validations';
import { TwoFAFormType } from './types';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useToast } from 'util/hooks/useToast';
import { useLogout } from 'apis/ps2/user/use';
import {
  DOWNLOAD_GOOGLE_AUTHENTICATOR_URL,
  HELP_CREATE_ENABLE_2FA_URL,
} from 'util/constants';
import copy from 'copy-to-clipboard';
import { ContentCopy } from '@mui/icons-material';

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
        toast.success(t('enable-2fa.success'));
        logout();
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
        <Box mt={1} mb={3}>
          <ZigTypography whiteSpace='pre-line'>
            <Trans i18nKey='enable-2fa.setup-description' t={t}>
              <Link
                href={DOWNLOAD_GOOGLE_AUTHENTICATOR_URL}
                target='_blank'
                rel='noopener'
              />
            </Trans>
          </ZigTypography>
        </Box>
        <QRCode aria-labelledby='QR Code' src={load2FAInfoResult.data[1]} />

        <ZigTypography color='yellow' my={3} variant='body2'>
          {t('enable-2fa.key-phrase-info')}
        </ZigTypography>
        <ZigInput
          label={t('enable-2fa.key-phrase')}
          type='text'
          value={load2FAInfoResult.data[0]}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label='Toggle password visibility'
                onClick={() => {
                  copy(load2FAInfoResult.data[0]);
                  toast.success(t('enable-2fa.key-phrase-copied'));
                }}
                icon={<ContentCopy sx={{ color: 'neutral200' }} />}
                variant='flat'
              />
            ),
          }}
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <ModalActionsNew align='right'>
            <ZigButton
              onClick={close}
              variant='outlined'
              size='large'
              id={'enable-2fa__cancel'}
            >
              {t('action:cancel')}
            </ZigButton>
            <ZigButton
              id={'enable-2fa__submit'}
              type='submit'
              variant='contained'
              size='large'
              loading={enable2FAStatus.isLoading}
              disabled={!isValid}
            >
              {t('enable-2fa.enable-2fa')}
            </ZigButton>
          </ModalActionsNew>
        </Form>
      </>
    );
  }

  return (
    <>
      <Box mt={1} mb={1}>
        <ZigTypography whiteSpace='pre-line'>
          <Trans i18nKey='enable-2fa.description' t={t}>
            <Link
              href={HELP_CREATE_ENABLE_2FA_URL}
              target='_blank'
              rel='noopener'
            />
          </Trans>
        </ZigTypography>
      </Box>

      <ModalActionsNew align='right'>
        <ZigButton
          onClick={close}
          variant='outlined'
          size='large'
          id='enable-2fa__setup-cancel'
        >
          {t('action:cancel')}
        </ZigButton>
        <ZigButton
          onClick={() => load2FAInfo()}
          loading={load2FAInfoResult.isLoading || load2FAInfoResult.isFetching}
          variant='contained'
          size='large'
          id='enable-2fa__setup'
        >
          {t('enable-2fa.setup-2fa')}
        </ZigButton>
      </ModalActionsNew>
    </>
  );
};

export default Enable2FAForm;
