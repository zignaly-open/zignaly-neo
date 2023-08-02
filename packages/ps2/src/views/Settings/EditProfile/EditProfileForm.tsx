import React, { useMemo } from 'react';
import {
  ZigButton,
  ZigInput,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyUserQuery, useUpdateUserMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
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

const EditProfileForm = () => {
  const { t, i18n } = useTranslation('settings');
  const user = useCurrentUser();
  const [loadUser, userReloadStatus] = useLazyUserQuery();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EditProfileFormType>({
    mode: 'onBlur',
    resolver: yupResolver(EditProfileValidation),
    defaultValues: {
      username: user.userName,
      email: user.email,
      bio: user.bio || '',
    },
  });

  const countryOptions = useMemo(
    () =>
      Object.entries(Countries.getNames(i18n.language)).map(
        ([value, label]) => ({
          value,
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
      email: data.email,
      about: data.bio,
      countryCode: data.country,
      // imageUrl?: string;
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
          <Box sx={{ pt: 3, pr: '50px' }}>
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
          </Box>
          <Grid container>
            <Grid sm={5} xs={12} p={1} pb={2}>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    wide
                    label={t('edit-profile.username')}
                    placeholder={t('edit-profile.username')}
                    error={t(errors.username?.message)}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid sm={7} xs={12} p={1} pb={2}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    wide
                    label={t('edit-profile.email')}
                    placeholder={t('edit-profile.email')}
                    error={t(errors.email?.message)}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid sm={12} p={1} pb={2}>
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

              <ZigTypography component={'p'} sx={{ mt: 2 }}>
                {user.userId}
              </ZigTypography>
            </Grid>
            <Grid sm={12} p={1} pb={2}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <ZigSelect
                    {...field}
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
                    rows={3}
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
                    placeholder={t('edit-profile.username')}
                    error={t(errors.bio?.message)}
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
