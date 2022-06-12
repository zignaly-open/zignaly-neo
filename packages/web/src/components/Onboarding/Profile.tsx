import Typography from '@mui/material/Typography';
import React, { Ref, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useCurrentUser from '../../hooks/useCurrentUser';
import Loader from '../common/Loader';
import Box from '@mui/material/Box';
import { USERNAME_PATTERN, useValidateUsername } from './util';
import { gql, useMutation } from '@apollo/client';

const CHANGE_PROFILE = gql`
  mutation editProfile($username: String) {
    updateProfile(username: $username) {
      id
      username
    }
  }
`;

type ProfileComponentType = React.FC<{
  onSuccess?: () => void;
  ref?: Ref<unknown>;
}>;

const ProfileInner: ProfileComponentType = React.forwardRef(
  ({ onSuccess }, ref) => {
    const { t } = useTranslation('onboarding');
    const { user } = useCurrentUser();
    const validateUsername = useValidateUsername();
    const [updateUsername, { loading: updatingProfile }] =
      useMutation(CHANGE_PROFILE);
    const { handleSubmit, control, formState, watch } = useForm({
      mode: 'onChange',
      defaultValues: {
        username: user.username || '',
      },
    });

    const submit = async (values: { username: string }) => {
      await updateUsername({
        variables: values,
      });
      onSuccess?.();
    };

    useImperativeHandle(ref, () => ({
      submit() {
        handleSubmit(submit)();
      },
    }));

    return (
      <Box textAlign={'center'}>
        <form name='profileForm' onSubmit={handleSubmit(submit)}>
          <Typography marginBottom={1}>{t('why-set-username')}</Typography>
          <Controller
            name='username'
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!formState.errors?.username}
                disabled={updatingProfile}
                helperText={
                  formState.errors?.username?.message ||
                  (!formState.isValidating &&
                    watch('username') &&
                    !formState.errors?.username &&
                    t('username-ok')) ||
                  ' '
                }
                placeholder={t('username-explainer')}
              />
            )}
            rules={{
              required: t('username-required'),
              maxLength: { value: 20, message: t('username-max') },
              minLength: { value: 2, message: t('username-min') },
              pattern: {
                value: USERNAME_PATTERN,
                message: t('username-regex'),
              },
              validate: validateUsername,
            }}
            control={control}
            defaultValue=''
          />

          <Typography
            marginTop={2}
            marginBottom={1}
            color={'secondary'}
            fontSize={14}
          >
            {t('why-set-username-2')}
          </Typography>
        </form>
      </Box>
    );
  },
);

const Profile: ProfileComponentType = React.forwardRef((props, ref) => {
  const { user } = useCurrentUser();
  return user ? <ProfileInner {...props} ref={ref} /> : <Loader />;
});

export default Profile;
