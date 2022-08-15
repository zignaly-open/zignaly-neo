import { Box, useMediaQuery } from '@mui/material';
import { Gap } from 'components/Modals/ConnectWallet/styles';
import React, { useState } from 'react';
import {
  Button,
  ErrorAlertIcon,
  ErrorMessage,
  InputText,
  Typography,
} from '@zignaly-open/ui';
import { InputContainer } from '../styles';
import theme from 'theme';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CHANGE_PROFILE } from 'queries/users';
import { UserSettingsValidation } from 'util/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from './styles';
import { UserSettingsModalProps } from '../types';
import { GET_AUCTIONS } from 'queries/auctions';

const SettingsForm = ({
  username = '',
  discordName = '',
  ...props
}: UserSettingsModalProps) => {
  // TODO: Add submit of userName and discordName to backend and avatar update
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const [errorMessage, setErrorMessage] = useState('');
  const [updateUsername, { loading: updatingProfile }] = useMutation(
    CHANGE_PROFILE,
    {
      refetchQueries: [{ query: GET_AUCTIONS }],
    },
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: username || '',
      discordName: discordName || '',
    },
    resolver: yupResolver(UserSettingsValidation),
  });

  const { t } = useTranslation('user-settings');

  const getFlexDirection = () => {
    if (matchesSmall) {
      return 'row';
    } else {
      return 'column';
    }
  };

  const getInputWidth = () => {
    if (matchesSmall) {
      return 404;
    } else {
      return null;
    }
  };

  const submit = async (values: { username: string; discordName: string }) => {
    try {
      await updateUsername({
        variables: values,
      });
      props.onClose({}, 'escapeKeyDown');
    } catch (_) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <Box display='flex' flexDirection='column'>
      {matchesSmall && <Gap gap={20} />}
      <Box
        display='flex'
        flexDirection={getFlexDirection()}
        justifyContent='center'
        alignItems='center'
      >
        <Form onSubmit={handleSubmit(submit)}>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='username'
              defaultValue={username}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('please-enter-username')}
                  minHeight={23}
                  label={t('username-label')}
                  error={errors.username?.message}
                />
              )}
            />
          </InputContainer>
          <Gap gap={5} />
          <Box display='flex' alignItems='center' flexDirection='row' gap='2px'>
            <Typography color='neutral200'>
              {t('discord-user-label', {
                ns: 'user-settings',
              })}
            </Typography>
            <ErrorAlertIcon color='#89899A' />
          </Box>
          <Typography variant='h4' weight='medium' color='neutral400'>
            {t('discordNameInfo')}
          </Typography>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='discordName'
              defaultValue={discordName}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  placeholder={t('please-enter-discord-user')}
                  minHeight={23}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.discordName?.message}
                />
              )}
            />
          </InputContainer>
          <Gap gap={matchesSmall ? 30 : 15} />
          <Box gap='12px' display='flex' flexDirection={getFlexDirection()}>
            {matchesSmall && (
              <Button
                caption={t('cancel')}
                variant='secondary'
                onClick={(e) => props.onClose(e, 'escapeKeyDown')}
                size='large'
              />
            )}
            <Button
              type={'submit'}
              minWidth={170}
              loading={updatingProfile}
              caption={t('save-profile')}
              size='large'
            />
          </Box>
          {errorMessage && (
            <>
              <Gap gap={7} />
              <ErrorMessage text={errorMessage} />
            </>
          )}
        </Form>
      </Box>
    </Box>
  );
};

export default SettingsForm;
