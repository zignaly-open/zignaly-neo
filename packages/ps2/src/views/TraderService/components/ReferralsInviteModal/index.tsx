import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Avatar, ZigButton, ZigTypography, trimZeros } from '@zignaly-open/ui';
import { TransferFormData, ReferralsInviteModalProps } from './types';
import ZModal, { Form } from 'components/ZModal';
import {
  useReferralRewardsQuery,
  useServiceCommissionQuery,
  useTierLevelsQuery,
  useUpdateServiceCommissionMutation,
} from 'apis/referrals/api';
import { Box, Grid, Tooltip } from '@mui/material';
import { getServiceLogo } from 'util/images';
import ZScoreChip from 'components/ZScoreChip';
import { fontWeight } from '@mui/system';
import { InviteBox, TooltipIcon } from './styles';
import TierBar from './components/TierBar';
import { numericFormatter } from 'react-number-format';
import Tiers from './components/TiersTable';

const ReferralsInviteModal = ({
  serviceId,
  service,
  close,
  ...props
}: ReferralsInviteModalProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);
  const { data: tiers0 } = useTierLevelsQuery();
  const tiers = [
    {
      id: 1,
      name: 'Tier 0',
      invitees: 1,
      commissionPct: 10,
    },
    {
      id: 2,
      name: 'Tier 1',
      invitees: 2,
      commissionPct: 20,
    },
    {
      id: 3,
      name: 'Tier 2',
      invitees: 3,
      commissionPct: 30,
    },
    {
      id: 4,
      name: 'Tier 3',
      invitees: 4,
      commissionPct: 40,
    },
    {
      id: 5,
      name: 'Tier 4',
      invitees: 5,
      commissionPct: 50,
    },
  ];
  const { data: serviceCommission0 } = useServiceCommissionQuery({ serviceId });
  const serviceCommission = {
    commission: 0,
  };
  const [updateComission, updateComissionLoading] =
    useUpdateServiceCommissionMutation();
  const { data: referralData0 } = useReferralRewardsQuery();
  const referralData = {
    referralCode: 'code_2003',
    invitedCount: 3,
    investorsCount: 0,
    usdtEarned: 11.0,
    usdtPending: 20.0,
    tierLevelId: 3,
    tierLevelFactor: 30.0,
    discountPct: 25.0,
    boost: 1.5,
    boostEndsAt: '2023-07-07T06:01:00',
  };
  console.log(tiers, serviceCommission, referralData);

  const {
    watch,
    handleSubmit,
    control,
    trigger,
    formState: { isValid, errors, isDirty },
  } = useForm<TransferFormData>({
    mode: 'onChange',
    // resolver: yupResolver(transferModalValidation(balanceFrom)),
    // defaultValues: {
    //   amountValue: '',
    // },
  });

  const onSubmit = () => {};

  const maxCommission = trimZeros(1 * 100);
  const inviteLeft = 5;

  return (
    <ZModal
      width={838}
      {...props}
      close={close}
      title={t('title', { max: 100 })}
      // isLoading={!balance || isTransferring}
    >
      <Grid container>
        <Grid item sm={12} md={4}>
          <Box
            width='228px'
            display='flex'
            flexDirection={'column'}
            alignItems={'center'}
            position='relative'
            gap='12px'
            sx={{
              borderRadius: '7.5px',
              border: 'solid 1px #25233c',
              backgroundImage:
                'radial-gradient(circle at 0 0, #131e53, #090824)',
            }}
          >
            <ZigTypography variant='h1' fontWeight='600'>
              {service.name}
            </ZigTypography>
            <Avatar
              size={134}
              alt={t('logo-alt', { name: service.name })}
              image={getServiceLogo(service.logo)}
              id={'referrals-invite-modal__avatar'}
            />
            <Box position='absolute' bottom='-28px'>
              <ZScoreChip prefixId='referrals-invite-modal' score={50} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={8}
          display='flex'
          flexDirection={'column'}
          alignItems={'center'}
        >
          <ZigTypography textTransform='uppercase' variant='h4'>
            {t('commission-rate')}
          </ZigTypography>
          <ZigTypography
            color='#28ba62'
            letterSpacing='1.49px'
            fontSize={50}
            fontWeight={600}
            py='15px'
            lineHeight='50px'
          >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {maxCommission}%
          </ZigTypography>
          <ZigTypography color='neutral200' variant='h3' fontWeight={400}>
            {t('when-you-invite', { invite: inviteLeft })}
          </ZigTypography>
          <Box
            sx={{
              borderRadius: '15px',
              border: 'solid 1.6px #9496b41a',
            }}
          >
            <ZigTypography variant='h3'>{t('split-commission')}</ZigTypography>
          </Box>
        </Grid>
      </Grid>
      <Box display='flex' gap='22px' mt='44px' px='22px'>
        <InviteBox>
          <ZigTypography color='neutral300' variant='h3' fontWeight={400}>
            {t('trader-referral-link')}
          </ZigTypography>
          <ZigTypography color='#ffffff' variant='h3'>
            https://zignaly.com/trader1920?=K823FE
          </ZigTypography>
        </InviteBox>
        <ZigButton
          sx={{
            height: '68px',
            minWidth: '152px',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          {t('copy-link', { ns: 'service' })}
        </ZigButton>
      </Box>
      <Box
        display='flex'
        flexDirection={'column'}
        alignItems={'center'}
        mt='39px'
      >
        <Box display='flex' flexDirection={'column'}>
          <ZigTypography color='rgba(255, 255, 255, 0.6)' fontSize={16}>
            {t('earn-success-fees')}
          </ZigTypography>
          <ZigTypography
            color='rgba(255, 255, 255, 0.6)'
            fontSize={16}
            textAlign={'left'}
          >
            {t('invite-and-earn', {
              invite: inviteLeft,
              commission: maxCommission,
            })}
          </ZigTypography>
        </Box>
      </Box>
      {referralData && (
        <Tiers
          tiers={tiers}
          referral={referralData}
          serviceCommission={serviceCommission.commission}
          zignalyCommission={5}
        />
      )}
    </ZModal>
  );
};

export default ReferralsInviteModal;
