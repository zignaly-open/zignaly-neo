import React, { useCallback, useMemo } from 'react';
import {
  ZigButton,
  ZigInput,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useKycStatusesQuery,
  useLazyUserQuery,
  useUpdateUserMutation,
} from 'apis/user/api';
import { Controller, useForm } from 'react-hook-form';
import Countries from 'i18n-iso-countries';
import { EditProfileValidation } from './validations';
import { EditProfileFormType } from './types';
import { Form, ModalActions } from 'components/ZModal';
import { useCurrentUser } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { Grid } from '@mui/material';
import Flag from '../../../components/Flag';
import ServiceLogo from '../../TraderService/components/ServiceLogo';
import { Box } from '@mui/system';
import { KYCStatusBox, ProfileStatusBox } from './atoms';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_2FA, ROUTE_KYC } from '../../../routes';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';
import { find, groupBy } from 'lodash-es';

const EditProfileForm = () => {
  const { t, i18n } = useTranslation('settings');
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [loadUser, userReloadStatus] = useLazyUserQuery();
  const { data: kycStatuses } = useKycStatusesQuery(undefined, {
    skip: !isFeatureOn(Features.Kyc),
  });

  const kycStarted = useMemo(() => {
    const kycStatusesCateg = groupBy(kycStatuses?.status, 'category');
    const res = find(kycStatusesCateg, (x) => {
      return x.some(
        (kyc) =>
          (kyc.status === 'rejected' && kyc.canBeRetried) ||
          ['approved', 'pending'].includes(kyc.status),
      );
    });
    if (!res) {
      return kycStatusesCateg[kycStatuses?.status[0].category];
    }
    return res;
  }, [kycStatuses?.status]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EditProfileFormType>({
    mode: 'onBlur',
    resolver: yupResolver(EditProfileValidation),
    defaultValues: {
      username: user.userName || '',
      imageUrl: user.imageUrl || '',
      bio: user.about || '',
      country: user.country || '',
    },
  });

  const filterCountries = useCallback(
    (
      option: {
        value?: string;
        data: {
          text?: string;
        };
      },
      input: string,
    ) => {
      if (input) {
        const lowerInput = input.toLowerCase();
        return (
          option.value?.toLowerCase().includes(lowerInput) ||
          option.data?.text?.toLowerCase().includes(lowerInput)
        );
      }
      return true;
    },
    [],
  );

  const countryOptions = useMemo(
    () =>
      Object.entries(Countries.getNames(i18n.language.split('_')[0])).map(
        ([value, label]) => ({
          value,
          text: label,
          label: (
            <ZigTypography sx={{ display: 'flex', alignItems: 'center' }}>
              <Flag country={value} />
              <ZigTypography sx={{ ml: 1.5 }}>{label}</ZigTypography>
            </ZigTypography>
          ),
        }),
      ),
    [i18n.language],
  );
  const [updateUser, updateUserStatus] = useUpdateUserMutation();
  const toast = useToast();

  const onSubmit = (data: EditProfileFormType) =>
    updateUser({
      userName: data.username,
      about: data.bio,
      countryCode: data.country,
      imageUrl: data.imageUrl,
    })
      .unwrap()
      .then(() => {
        loadUser();
        toast.success(t('edit-profile.success'));
      });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <Box sx={{ pt: 3, pr: '50px', flex: '0 0 220px' }}>
            <Controller
              name='imageUrl'
              control={control}
              render={({ field }) => (
                <ServiceLogo
                  size={100}
                  label={t('edit-profile.edit-avatar')}
                  {...field}
                />
              )}
            />

            <Box sx={{ pt: 2 }}>
              <ProfileStatusBox
                isSuccess={user['2FAEnable']}
                label={t('edit-profile.status-box.2fa')}
                ctaLabel={t('edit-profile.status-box.enable-2fa-cta')}
                cta={() => navigate(generatePath(ROUTE_2FA))}
                status={t(
                  user['2FAEnable']
                    ? 'edit-profile.status-box.enabled'
                    : 'edit-profile.status-box.disabled',
                )}
              />

              {isFeatureOn(Features.Kyc) && !!kycStatuses && kycStarted && (
                <KYCStatusBox
                  kycStatuses={kycStarted}
                  cta={() => navigate(generatePath(ROUTE_KYC))}
                />
              )}
            </Box>
          </Box>
          <Grid container>
            <Grid sm={6} xs={12} p={1} pb={2}>
              <ZigTypography>{t('edit-profile.email')}</ZigTypography>

              <ZigTypography
                component={'p'}
                sx={{ mt: 1, wordWrap: 'break-word' }}
              >
                {user.email}
              </ZigTypography>
            </Grid>

            <Grid sm={6} p={1} pb={2}>
              <ZigTypography>
                {t('edit-profile.user-id')}
                <ZigTypography
                  sx={{ pl: 1 }}
                  variant={'body2'}
                  color={'neutral400'}
                >
                  {t('edit-profile.internal-use')}
                </ZigTypography>
              </ZigTypography>

              <ZigTypography component={'p'} sx={{ mt: 1 }}>
                {user.userId}
              </ZigTypography>
            </Grid>

            <Grid sm={12} xs={12} p={1} pb={2}>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    wide
                    label={t('edit-profile.username')}
                    placeholder={t('edit-profile.username')}
                    error={t(errors.username?.message, { maxLength: 60 })}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid sm={12} p={1} pb={2}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <ZigSelect
                    {...field}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    filterOption={filterCountries}
                    label={
                      <>
                        {t('edit-profile.country')}
                        <ZigTypography
                          sx={{ pl: 1 }}
                          variant={'body2'}
                          color={'neutral400'}
                        >
                          {t('edit-profile.visible-if-trader')}
                        </ZigTypography>
                      </>
                    }
                    placeholder={t('edit-profile.country')}
                    options={countryOptions}
                    error={t(errors.country?.message)}
                  />
                )}
              />
            </Grid>
            <Grid sm={12} p={1} pb={2}>
              <Controller
                name='bio'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    wide
                    multiline
                    rows={12}
                    label={
                      <ZigTypography>
                        {t('edit-profile.about-you')}
                        <ZigTypography
                          sx={{ pl: 1 }}
                          variant={'body2'}
                          color={'neutral400'}
                        >
                          {t('edit-profile.visible-if-trader')}
                        </ZigTypography>
                      </ZigTypography>
                    }
                    placeholder={t(
                      'edit-profile.tell-me-the-story-of-your-left',
                    )}
                    error={t(errors.bio?.message, { maxLength: 2000 })}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <ModalActions>
          <ZigButton
            id={'edit-profile__submit'}
            type='submit'
            variant='contained'
            size='large'
            loading={updateUserStatus.isLoading || userReloadStatus.isLoading}
            disabled={!isValid}
          >
            {t('edit-profile.update-profile')}
          </ZigButton>
        </ModalActions>
      </Form>
    </>
  );
};

export default EditProfileForm;
