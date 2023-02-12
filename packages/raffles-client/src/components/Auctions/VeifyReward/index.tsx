import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { Layout } from './styles';
import { Button } from '@zignaly-open/ui';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION, CONFIRM_EMAIL_MUTATION } from 'queries/users';
import { Send } from '@mui/icons-material';
// import { Stack } from '@mui/material';

const StyledSendIcon = styled(Send)`
  color: ${(props) => props.theme.neutral200};
`;

const VerifyReward = () => {
  const { t } = useTranslation('global');
  const { user: currentUser } = useCurrentUser();

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION);
  const [confirmEmail] = useMutation(CONFIRM_EMAIL_MUTATION);
  const [email, setEmail] = React.useState('');
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerifyEmail = async () => {
    await verifyEmail({
      variables: { userId: Number(currentUser.id), email },
    });
    await setIsEmailSent(true);
  };

  useEffect(() => {
    if (currentUser?.emailVerified) {
      setIsConfirmed(currentUser.emailVerified);
    }
    const userIdParams = new URLSearchParams(window.location.search).get(
      'confirm',
    );
    if (userIdParams) {
      confirmEmail({ variables: { userId: Number(userIdParams) } });
    }
  }, [currentUser]);

  return isConfirmed || !currentUser ? (
    <></>
  ) : !isEmailSent ? (
    <form onSubmit={(e) => e.preventDefault()}>
      <Layout
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        mb={{ xs: 5, md: 1 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <label htmlFor='email'>{t('verify-email-and-earn')}</label>
          <input
            id='email'
            type='email'
            placeholder={t('Enter email')}
            onChange={handleEmail}
          />
          <Button
            variant='secondary'
            size='small'
            caption={t('validate')}
            leftElement={<StyledSendIcon />}
            onClick={() => {
              handleVerifyEmail();
            }}
          />
        </div>
      </Layout>
    </form>
  ) : (
    <>
      <p>{t('email-sent')}</p>
    </>
  );
};

export default VerifyReward;
