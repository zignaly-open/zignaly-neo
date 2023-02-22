import { Box, useMediaQuery } from '@mui/material';
import { Gap } from 'components/Modals/ConnectWallet/styles';
import React, { useState } from 'react';
import {
  Button,
  ErrorMessage,
  ZigTypography,
  ZigInput,
} from '@zignaly-open/ui';
import { InputContainer } from '../styles';
import theme from 'theme';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  CHANGE_PROFILE,
  GET_CURRENT_USER,
  VERIFY_EMAIL_MUTATION,
} from 'queries/users';
import { UserSettingsValidation } from 'util/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from './styles';
import { UserSettingsModalProps } from '../types';
import { GET_AUCTIONS } from 'queries/auctions';
import useCurrentUser from 'hooks/useCurrentUser';

const SettingsForm = (props: UserSettingsModalProps) => {
  const { user } = useCurrentUser();
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
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username || '',
      discordName: user.discordName || '',
      email: user.email || '',
    },
    resolver: yupResolver(UserSettingsValidation),
  });

  const { t } = useTranslation('user-settings');

  const getFlexDirection = () => {
    if (matchesSmall) {
      return 'row';
    } else {
      return 'column-reverse';
    }
  };

  const getInputWidth = () => {
    if (matchesSmall) {
      return 404;
    } else {
      return null;
    }
  };

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const submit = async (values: {
    username: string;
    email: string;
    discordName: string;
  }) => {
    try {
      if (user.email !== values.email) {
        verifyEmail({
          variables: { userId: Number(user.id), email: values.email },
        });
      }
      await updateUsername({
        variables: values,
      });
      props.onClose({}, 'escapeKeyDown');
    } catch (e) {
      setErrorMessage(e.message || 'Something went wrong');
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
          <Box display='flex' alignItems='center' flexDirection='row' gap='2px'>
            <ZigTypography color='neutral200'>
              {t('username-label')}
            </ZigTypography>
          </Box>
          <ZigTypography variant='h4' color='neutral400'>
            {t('username-info')}
          </ZigTypography>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <ZigInput
                  fullWidth
                  placeholder={`${t('user')}#${user.id}`}
                  error={t(errors.username?.message)}
                  {...field}
                />
              )}
            />
          </InputContainer>
          <Gap gap={5} />
          <Box display='flex' alignItems='center' flexDirection='row' gap='2px'>
            <ZigTypography color='neutral200'>
              {t('discord-user-label')}
            </ZigTypography>
          </Box>
          <ZigTypography variant='h4' color='neutral400'>
            {t('discordNameInfo')}
          </ZigTypography>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='discordName'
              control={control}
              render={({ field }) => (
                <ZigInput
                  fullWidth
                  placeholder='user#0000'
                  error={t(errors.discordName?.message)}
                  {...field}
                />
              )}
            />
          </InputContainer>
          <Gap gap={5} />
          <Box display='flex' alignItems='center' flexDirection='row' gap='2px'>
            <ZigTypography color='neutral200'>{t('email-label')}</ZigTypography>
          </Box>
          <ZigTypography variant='h4' color='neutral400'>
            {t('email-info')}
          </ZigTypography>
          <InputContainer width={getInputWidth()}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <ZigInput
                  fullWidth
                  placeholder={t('email-placeholder')}
                  error={
                    user.emailVerified
                      ? errors.email?.message
                      : t('email-not-verified')
                  }
                  {...field}
                />
              )}
            />
          </InputContainer>
          <Gap gap={matchesSmall ? 30 : 15} />
          <Box
            gap='12px'
            display='flex'
            justifyContent='center'
            flexDirection={getFlexDirection()}
          >
            <Button
              caption={t('cancel')}
              variant='secondary'
              onClick={(e) => props.onClose(e, 'escapeKeyDown')}
              size='large'
            />
            <Button
              type={'submit'}
              minWidth={170}
              loading={updatingProfile}
              caption={t('save-profile')}
              size='large'
              disabled={!isValid}
            />
          </Box>
          {errorMessage && (
            <>
              <Gap gap={13} />
              <ErrorMessage text={errorMessage} />
            </>
          )}
        </Form>
      </Box>
    </Box>
  );
};

export default SettingsForm;
