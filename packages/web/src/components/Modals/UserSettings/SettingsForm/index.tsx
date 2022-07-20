import { Box, useMediaQuery } from '@mui/material';
import { Gap } from 'components/Modals/ConnectWallet/styles';
import React from 'react';
import { Avatar, Button, InputText } from 'zignaly-ui';
import { InputContainer } from '../styles';
import Placeholder from '../../../../assets/avatar-placeholder.png';
import theme from 'theme';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CHANGE_PROFILE } from 'queries/users';

const SettingsForm = ({
  username = '',
  discordName = '',
}: {
  username?: string;
  discordName?: string;
}) => {
  // TODO: Add submit of userName and discordName to backend and avatar update
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [updateUsername, { loading: updatingProfile }] =
    useMutation(CHANGE_PROFILE);
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: username || '',
      discordName: discordName || '',
    },
  });

  const { t } = useTranslation('user-settings');

  const getFlexDirection = () => {
    if (matchesLarge) {
      return 'row';
    } else {
      return 'column';
    }
  };

  const getInputWidth = () => {
    if (matchesLarge) {
      return 404;
    } else {
      return null;
    }
  };

  const submit = async (values: { username: string; discordName: string }) => {
    await updateUsername({
      variables: values,
    });
  };

  return (
    <Box display='flex' flexDirection='column'>
      {matchesLarge && <Gap gap={17} />}
      <Box display='flex' flexDirection={getFlexDirection()}>
        {matchesLarge ? (
          <Box marginRight='71px'>
            <Avatar image={Placeholder} size='xx-large' />
          </Box>
        ) : (
          <Box>
            <Box display='flex'>
              <Box flex={1} />
              <Avatar image={Placeholder} size='xx-large' />
              <Box flex={1} />
            </Box>
            <Gap gap={15} />
          </Box>
        )}
        <Box>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='username'
              defaultValue={username}
              control={control}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('please-enter-username')}
                  minHeight={23}
                  label={t('username-label')}
                />
              )}
            />
          </InputContainer>
          <Gap gap={5} />
          <InputContainer width={getInputWidth()}>
            <Controller
              name='discordName'
              defaultValue={discordName}
              control={control}
              render={({ field }) => (
                <InputText
                  placeholder={t('please-enter-discord-user')}
                  minHeight={23}
                  label={t('discord-user-label')}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            ></Controller>
          </InputContainer>
          <Gap gap={matchesLarge ? 46 : 15} />
          <Box gap='12px' display='flex' flexDirection={getFlexDirection()}>
            <Button
              minWidth={128}
              caption={t('cancel')}
              variant='secondary'
              size='large'
            />
            <Button
              onClick={handleSubmit(submit)}
              minWidth={170}
              loading={updatingProfile}
              caption={t('save-profile')}
              size='large'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsForm;
