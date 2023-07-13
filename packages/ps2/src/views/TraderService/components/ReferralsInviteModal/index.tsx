import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Avatar,
  ZigButton,
  ZigClockIcon,
  ZigTypography,
  ZigUserFilledIcon,
  trimZeros,
} from '@zignaly-open/ui';
import { ReferralsInviteModalProps } from './types';
import ZModal from 'components/ZModal';
import {
  useReferralRewardsQuery,
  useServiceCommissionQuery,
  useTierLevelsQuery,
  useUpdateServiceCommissionMutation,
} from 'apis/referrals/api';
import { Box, Grid } from '@mui/material';
import { CommissionBoostChip, InviteBox } from './styles';
import Tiers from './atoms/TiersTable';
import { Verified } from '@mui/icons-material';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isFuture,
} from 'date-fns';
import { getBoostedCommissionPct } from './util';
import { useInterval } from 'react-use';
import BoostChip from './atoms/BoostChip';
import { ShareCommissionSlider } from './atoms/ShareCommissionSlider';
import { DescriptionLine } from './atoms/DescriptionLine';
import TraderCard from './atoms/TraderCard';
import ReferralLinkInvite from './atoms/ReferralLinkInvite';

// const fakeDate = format(addSeconds(new Date(), 10), "yyyy-MM-dd'T'HH:mm:ss");
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
    commission: 10,
  };
  const zignalyCommission = 5;
  const [updateComission, updateComissionLoading] =
    useUpdateServiceCommissionMutation();
  const { data: referralData0 } = useReferralRewardsQuery();
  const referralData = {
    referralCode: 'K823FE',
    invitedCount: 1,
    investorsCount: 0,
    usdtEarned: 11.0,
    usdtPending: 20.0,
    tierLevelId: 3,
    tierLevelFactor: 30.0,
    discountPct: 25.0,
    boost: 1,
    boostEndsAt: '2023-07-17T06:01:00',
    // boostEndsAt: fakeDate,
  };
  console.log(tiers, serviceCommission, referralData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const inviteLeft = 5;
  const boostEndsDate = new Date(referralData.boostEndsAt);
  const boostRunning = isFuture(boostEndsDate);
  const boost = boostRunning ? 2 : referralData.boost;
  const days = differenceInDays(boostEndsDate, currentDate);
  const hours = differenceInHours(boostEndsDate, currentDate) % 24;
  const minutes = differenceInMinutes(boostEndsDate, currentDate) % 60;
  useInterval(
    () => {
      setCurrentDate(new Date());
    },
    boostRunning ? 10000 : null,
  );

  const maxCommission = getBoostedCommissionPct(
    tiers[tiers.length - 1].commissionPct,
    boost,
    serviceCommission.commission,
    zignalyCommission,
  );
  const maxCommissionWithoutTraderBoost = getBoostedCommissionPct(
    tiers[tiers.length - 1].commissionPct,
    boost,
    0,
  );
  const traderBoostMultiplier = maxCommission / maxCommissionWithoutTraderBoost;

  return (
    <ZModal
      width={838}
      {...props}
      close={close}
      title={t('title', { commission: maxCommission })}
      // isLoading={!balance || isTransferring}
    >
      <Grid container mt={'22px'}>
        <Grid item sm={12} md={4}>
          <TraderCard service={service} traderBoost={traderBoostMultiplier} />
        </Grid>
        <Grid
          item
          sm={12}
          md={8}
          display='flex'
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Box display={'flex'} width={1} justifyContent={'space-evenly'}>
            <Box display='flex' flexDirection={'column'}>
              <ZigTypography textTransform='uppercase' variant='h4'>
                {t(
                  referralData.invitedCount > 0
                    ? 'max-commission'
                    : 'commission-rate',
                )}
              </ZigTypography>
              <ZigTypography
                color='#28ba62'
                letterSpacing='1.49px'
                fontSize={50}
                fontWeight={600}
                py='15px'
                lineHeight='50px'
                position={'relative'}
              >
                {maxCommission}
                <ZigTypography
                  fontSize={25}
                  fontWeight={600}
                  color='inherit'
                  position={'relative'}
                  top='-11px'
                  left='1px'
                >
                  {'%'}
                </ZigTypography>
                {serviceCommission.commission && (
                  <CommissionBoostChip>
                    <BoostChip boost={traderBoostMultiplier} showBolt />
                  </CommissionBoostChip>
                )}
              </ZigTypography>
            </Box>
            {referralData.invitedCount > 0 && (
              <Box display='flex' flexDirection={'column'}>
                <ZigTypography textTransform='uppercase' variant='h4'>
                  {t('my-invites')}
                </ZigTypography>
                <Box display={'flex'} alignItems={'center'} flex={1}>
                  <ZigUserFilledIcon color='#999fe1' width={18} height={21.5} />
                  <ZigTypography
                    variant='h4'
                    color='#999fe1'
                    fontSize={35}
                    pl='9px'
                    pr='7px'
                  >
                    {referralData.invitedCount}
                  </ZigTypography>
                  <Verified sx={{ color: '#26c496' }} />
                </Box>
              </Box>
            )}
          </Box>
          <ZigTypography color='neutral200' variant='h3' fontWeight={400}>
            <Trans
              i18nKey={
                referralData.invitedCount > 0
                  ? `get-by-inviting${boostRunning ? '-in' : ''}`
                  : 'when-you-invite'
              }
              t={t}
              values={{
                invite: inviteLeft,
                commission: maxCommission,
              }}
            >
              <ZigTypography
                component='span'
                variant='h3'
                fontWeight={400}
                color='#25c89b'
              />
            </Trans>
          </ZigTypography>
          {boostRunning && (
            <Box display={'flex'} alignItems={'center'} gap='9px' mt='11px'>
              <ZigClockIcon color='#e93ea7' />
              <ZigTypography color='#e93ea7' variant='h4' fontWeight={400}>
                {`${t('day', { count: days })}, ${t('hour', {
                  count: hours,
                })}, ${t('minute', { count: minutes })}`}
              </ZigTypography>
            </Box>
          )}

          <Box px={2}>
            <ShareCommissionSlider
              discountPct={referralData.discountPct}
              max={maxCommission}
            />
          </Box>
        </Grid>
      </Grid>
      <Box display='flex' gap='22px' mt='44px' px='22px'>
        <ReferralLinkInvite
          serviceId={serviceId}
          referralCode={referralData.referralCode}
        />
      </Box>
      <Box
        display='flex'
        flexDirection={'column'}
        alignItems={'center'}
        mt='40px'
        mb='16px'
      >
        <Box display='flex' flexDirection={'column'}>
          {inviteLeft > 0 && (
            <>
              {referralData.invitedCount > 0 ? (
                <ZigTypography
                  fontSize={19}
                  textAlign={'left'}
                  fontWeight={600}
                >
                  {t('invite-more', {
                    invite: inviteLeft,
                    commission: maxCommission,
                  })}
                </ZigTypography>
              ) : (
                <>
                  <DescriptionLine text={t('earn-success-fees')} />
                  {!boostRunning && !serviceCommission.commission && (
                    <DescriptionLine
                      text={t('invite-and-earn', {
                        invite: inviteLeft,
                        commission: maxCommission,
                      })}
                    />
                  )}
                  {boostRunning && (
                    <DescriptionLine
                      text={t('invite-and-earn-1-week', {
                        invite: inviteLeft,
                        commission: maxCommissionWithoutTraderBoost,
                      })}
                    />
                  )}
                  {serviceCommission.commission > 0 && (
                    <DescriptionLine
                      text={t('invite-and-earn-trader-boost', {
                        invite: inviteLeft,
                        commissionBefore: trimZeros(
                          maxCommissionWithoutTraderBoost,
                        ),
                        commission: maxCommission,
                        multiplier: traderBoostMultiplier,
                      })}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
      {referralData && (
        <Tiers
          tiers={tiers}
          referral={referralData}
          serviceCommission={serviceCommission.commission}
          zignalyCommission={zignalyCommission}
          boost={boost}
          boostRunning={boostRunning}
        />
      )}
    </ZModal>
  );
};

export default ReferralsInviteModal;
