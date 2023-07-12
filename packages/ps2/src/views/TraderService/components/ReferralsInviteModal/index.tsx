import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import {
  Avatar,
  ZigButton,
  ZigClockIcon,
  ZigTypography,
  ZigUserFilledIcon,
  trimZeros,
} from '@zignaly-open/ui';
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
import { CommissionBoostChip, InviteBox, TooltipIcon } from './styles';
import TierBar from './components/TierBar';
import { numericFormatter } from 'react-number-format';
import Tiers from './components/TiersTable';
import {
  ArrowForward,
  ArrowRight,
  ArrowRightAlt,
  Verified,
} from '@mui/icons-material';
import { DescriptionLine } from './atoms';
import {
  addMinutes,
  addSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isFuture,
} from 'date-fns';
import { getBoostedCommissionPct } from './util';
import { max } from 'lodash';
import { useInterval } from 'react-use';
import BoostChip from './components/BoostChip';
import { ShareCommissionSlider } from './components/ShareCommissionSlider';

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
    referralCode: 'code_2003',
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
                {'%'}
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
