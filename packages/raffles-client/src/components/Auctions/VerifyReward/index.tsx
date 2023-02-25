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
  GET_CURRENT_USER,
  GET_CURRENT_USER_BALANCE,
} from 'queries/users';
import { Send } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { Form, Gap } from './styles';
import { EmailValidation } from 'util/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import useConfirmEmail from 'hooks/useConfirmEmail';

const StyledSendIcon = styled(Send)`
  color: ${(props) => props.theme.neutral200};
`;

const VerifyReward: React.FC = () => {
  const { t } = useTranslation('global');
  const { user: currentUser } = useCurrentUser();

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION, {
    refetchQueries: [
      { query: GET_CURRENT_USER },
      { query: GET_CURRENT_USER_BALANCE },
    ],
  });

  const { confirmEmail, loading } = useConfirmEmail();
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [searchParams] = useSearchParams();
  const [isInvalidLink, setIsInvalidLink] = useState(false);

  const handleVerifyEmail = async (email: string) => {
    await verifyEmail({
      variables: { userId: Number(currentUser.id), email },
    });
    setEmailSent(true);
  };

  useEffect(() => {
    const checkConfirm = async () => {
      const hashStr = searchParams.get('confirm');
      if (hashStr) {
        const result = await confirmEmail(hashStr);
        if (loading) {
          setVerificationMessage(t('loading'));
        } else {
          if (currentUser && currentUser.emailVerified) {
            setVerificationMessage('');
          } else {
            setVerificationMessage(t('confirmation-link-invalid'));
            if (result === 'confirmation-link-invalid') {
              setIsInvalidLink(true);
            }
          }
        }
      }
    };
    checkConfirm();
  }, []);

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

  return currentUser && currentUser.emailVerified && !isInvalidLink ? (
    <ZigTypography variant='h2' color='neutral400'>
      {verificationMessage}
    </ZigTypography>
  ) : currentUser && !currentUser.emailVerified && !emailSent ? (
    <>
      <ZigTypography variant='h2' color='red'>
        {isInvalidLink ? t('confirmation-link-invalid') : ''}
      </ZigTypography>
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
    </>
  ) : (
    <>
      <ZigTypography variant='h2' color='neutral400'>
        {verificationMessage}
      </ZigTypography>
    </>
  );
};

export default VerifyReward;
