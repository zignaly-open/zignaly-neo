import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { Typography, TextButton } from '@zignaly-open/ui';
// import {
//   Step,
//   TypographyTitle,
//   Layout,
//   StepDetails,
//   TypographyStep,
// } from './styles';
import { styled } from '@mui/material/styles';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { Layout } from './styles';
import { Button } from '@zignaly-open/ui';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION, CONFIRM_EMAIL_MUTATION } from 'queries/users';
import { People } from '@mui/icons-material';
// import { Stack } from '@mui/material';
// import { ReactComponent as BidIcon } from '../../../assets/icons/bid_gradient.svg';
// import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy_gradient.svg';
// import { ReactComponent as WalletIcon } from '../../../assets/icons/wallet_gradient.svg';
// import { ReactComponent as ZigcoinIcon } from '../../../assets/icons/zigcoin_gradient.svg';

const StyledPeopleIcon = styled(People)`
  color: ${(props) => props.theme.neutral200};
`;

const VerifyReward = () => {
  const { t } = useTranslation('global');
  const { user: currentUser } = useCurrentUser();

  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION);
  const [confirmEmail] = useMutation(CONFIRM_EMAIL_MUTATION);
  const [email, setEmail] = React.useState('');
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerifyEmail = () => {
    verifyEmail({
      variables: { userId: Number(currentUser.id), email },
    });
  };

  useEffect(() => {
    const userIdParams = new URLSearchParams(window.location.search).get(
      'confirm',
    );
    if (userIdParams) {
      confirmEmail({ variables: { userId: Number(userIdParams) } });
    }
  }, [currentUser]);

  return (
    <Layout
      display='flex'
      flexDirection='column'
      alignItems='center'
      mb={{ xs: 5, md: 1 }}
    >
      <p>{'Verify Email'}</p>
      {/* <ZigTypography color='neutral200'>
        {t('discord-user-label')}
      </ZigTypography> */}
      <input placeholder='email' onChange={handleEmail} />
      <Button
        variant='secondary'
        size='small'
        caption={t('Validate email')}
        leftElement={<StyledPeopleIcon />}
        onClick={() => {
          handleVerifyEmail();
        }}
      />
    </Layout>
  );
};

export default VerifyReward;
