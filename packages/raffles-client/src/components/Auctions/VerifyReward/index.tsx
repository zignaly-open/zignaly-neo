import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
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
import useCurrentUser, { useEmailSubscription } from 'hooks/useCurrentUser';

const StyledSendIcon = styled(Send)`
  color: ${(props) => props.theme.neutral200};
`;

const VerifyReward: React.FC = () => {
  const { t } = useTranslation('global');
  const { user: currentUser } = useCurrentUser();
  useEmailSubscription();

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION, {
    refetchQueries: [
      { query: GET_CURRENT_USER },
      { query: GET_CURRENT_USER_BALANCE },
    ],
  });

  const { confirmEmail } = useConfirmEmail();
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState(
    'verify-email-and-earn',
  );
  const [searchParams] = useSearchParams();

  const handleVerifyEmail = async (email: string) => {
    await verifyEmail({
      variables: { userId: Number(currentUser.id), email },
    });
  };

  useEffect(() => {
    const hashStr = searchParams.get('confirm');
    if (currentUser) {
      if (currentUser.emailVerified) {
        setVerificationMessage('');
      } else if (currentUser.zhitRewarded) {
        setVerificationMessage('verify-email');
      }
    }
    if (hashStr) {
      confirmEmail(hashStr).then((result) => {
        setVerificationMessage(t(result));
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed) {
      setVerificationMessage(t('email-confirmed'));
    }
  }, [searchParams]);

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

  return currentUser ? (
    <>
      <ZigTypography variant='h2' color='neutral400'>
        {t(verificationMessage)}
      </ZigTypography>
      <Box
        display='flex'
        flexDirection='row'
        sx={{
          display:
            currentUser.emailVerified ||
            verificationMessage === 'Email verified!'
              ? 'none'
              : '',
        }}
      >
        <Form onSubmit={handleSubmit(submit)}>
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
    <></>
  );
};

export default VerifyReward;
