import React, { useCallback, useMemo } from 'react';
import {
  ZigButton,
  ZigInput,
  ZigSelect,
  ZigTypography,
  ZigModalForm,
  ZigModalActions,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyUserQuery, useUpdateUserMutation } from 'apis/user/api';
import { Controller, useForm } from 'react-hook-form';
import Countries from 'i18n-iso-countries';
import { EditProfileValidation } from './validations';
import { EditProfileFormType } from './types';
import { useCurrentUser } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Flag from '../../../components/Flag';
import { Box } from '@mui/system';
import { ServiceLogoStatus } from './atoms';

const EditProfileForm = () => {
  const { t, i18n } = useTranslation('settings');
  const user = useCurrentUser();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const [loadUser, userReloadStatus] = useLazyUserQuery();

  const {
    handleSubmit,
    control,
    watch,
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
      <ZigModalForm onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          {md && (
            <Box sx={{ pt: 3, pr: '50px', flex: '0 0 220px' }}>
              <ServiceLogoStatus control={control} />
            </Box>
          )}
          <Grid container>
            <Grid container alignItems={'center'}>
              {!md && (
                <Grid sm={3} xs={12} p={1} pb={2} order={!sm && 3}>
                  <Box
                    display={'flex'}
                    gap={sm ? '30px' : '10px'}
                    alignItems={'center'}
                    justifyContent={sm && 'center'}
                  >
                    <ServiceLogoStatus control={control} />
                  </Box>
                </Grid>
              )}
              <Grid sm={4.5} xs={12} p={1} pb={2} order={!sm && 1}>
                <ZigTypography id={'edit-profile__email-label'}>
                  {t('edit-profile.email')}
                </ZigTypography>

                <ZigTypography
                  component={'p'}
                  sx={{ mt: 1, wordWrap: 'break-word' }}
                  id={'edit-profile__email'}
                >
                  {user.email}
                </ZigTypography>
              </Grid>

              <Grid
                sm={4.5}
                xs={12}
                p={1}
                pb={2}
                justifyContent={'center'}
                alignItems={'center'}
                order={!sm && 2}
              >
                <ZigTypography id={'edit-profile__user-id-label'}>
                  {t('edit-profile.user-id')}
                  <ZigTypography
                    sx={{ pl: 1 }}
                    variant={'body2'}
                    color={'neutral400'}
                  >
                    {t('edit-profile.internal-use')}
                  </ZigTypography>
                </ZigTypography>

                <ZigTypography
                  component={'p'}
                  sx={{ mt: 1 }}
                  id={'edit-profile__user-id'}
                >
                  {user.userId}
                </ZigTypography>
              </Grid>
            </Grid>

            <Grid sm={12} xs={12} p={1} pb={2}>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    id={'edit-profile__username'}
                    wide
                    label={t('edit-profile.username')}
                    placeholder={t('edit-profile.username')}
                    error={t(errors.username?.message, { maxLength: 15 })}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} p={1} pb={2}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <ZigSelect
                    {...field}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    filterOption={filterCountries}
                    // necessary because field.value resets to default value: user.country, not undefined
                    value={watch('country')}
                    isClearable
                    id={'edit-profile__country-select'}
                    label={
                      <>
                        {t('edit-profile.country')}
                        <ZigTypography
                          sx={{ pl: 1 }}
                          variant={'body2'}
                          color={'neutral400'}
                          id={'edit-profile__country-select-visible-if-trader'}
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
            <Grid xs={12} p={1} pb={2}>
              <Controller
                name='bio'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    id={'edit-profile__about-you'}
                    wide
                    multiline
                    rows={12}
                    label={
                      <ZigTypography id={'edit-profile__about-you-label'}>
                        {t('edit-profile.about-you')}
                        <ZigTypography
                          sx={{ pl: 1 }}
                          variant={'body2'}
                          color={'neutral400'}
                          id={'edit-profile__about-you-visible-if-trader'}
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

        <ZigModalActions>
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
        </ZigModalActions>
      </ZigModalForm>
    </>
  );
};

export default EditProfileForm;
