import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import useCurrentUser from '../../../hooks/useCurrentUser';
import {
  Button,
  ErrorMessage,
  ZigTypography,
  ZigInput,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import {
  VERIFY_EMAIL_MUTATION,
  CONFIRM_EMAIL_MUTATION,
  GET_CURRENT_USER,
  GET_CURRENT_USER_BALANCE,
} from 'queries/users';
import { Send } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { Form, Gap } from './styles';
import { EmailValidation } from 'util/validation';
import { yupResolver } from '@hookform/resolvers/yup';

const StyledSendIcon = styled(Send)`
  color: ${(props) => props.theme.neutral200};
`;

const VerifyReward = () => {
  const { t } = useTranslation('global');
  const { user: currentUser } = useCurrentUser();

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION, {
    refetchQueries: [
      { query: GET_CURRENT_USER },
      { query: GET_CURRENT_USER_BALANCE },
    ],
  });

  const [confirmEmail] = useMutation(CONFIRM_EMAIL_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleVerifyEmail = async (email: string) => {
    await verifyEmail({
      variables: { userId: Number(currentUser.id), email },
    });
    setEmailSent(true);
  };

  useEffect(() => {
    const checkUserState = async () => {
      const hashStr = new URLSearchParams(window.location.search).get(
        'confirm',
      );
      if (hashStr) {
        const { data } = await confirmEmail({ variables: { hashStr } });
        if (!data.confirmEmail) {
          setVerificationMessage(t('confirmation-link-invalid'));
        } else {
          setVerificationMessage(t('email-confirmed'));
        }
      }
    };

    checkUserState();
  }, [currentUser]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(EmailValidation),
  });

  const submit = async (values: { email: string }) => {
    try {
      handleVerifyEmail(values.email);
      setVerificationMessage(t('email-sent'));
    } catch (e) {
      setErrorMessage(e.message || 'Something went wrong');
    }
  };

  return currentUser && currentUser.emailVerified ? (
    <ZigTypography variant='h2' color='neutral400'>
      {verificationMessage}
    </ZigTypography>
  ) : currentUser && !currentUser.emailVerified && !emailSent ? (
    <Box display='flex' flexDirection='row'>
      <Form onSubmit={handleSubmit(submit)}>
        <ZigTypography variant='h2' color='neutral400'>
          {!currentUser.zhitRewarded
            ? t('verify-email-and-earn')
            : t('verify-email')}
        </ZigTypography>
        <Box display='flex' flexDirection='row'>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <ZigInput
                fullWidth
                placeholder={t('email-placeholder')}
                error={errors.email?.message}
                {...field}
              />
            )}
          />
          <Gap gap={13} />
          <Button
            type={'submit'}
            leftElement={<StyledSendIcon />}
            caption={t('validate')}
            size='large'
            disabled={!isValid}
          />
          {errorMessage && (
            <>
              <Gap gap={13} />
              <ErrorMessage text={errorMessage} />
            </>
          )}
        </Box>
      </Form>
    </Box>
  ) : (
    <>
      <ZigTypography variant='h2' color='neutral400'>
        {verificationMessage}
      </ZigTypography>
    </>
  );
};

export default VerifyReward;
