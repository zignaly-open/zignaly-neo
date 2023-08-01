import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
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
} from 'apis/referrals/api';
import { Box, Grid } from '@mui/material';
import { CommissionBoostChip } from './styles';
import Tiers from './atoms/TiersTable';
import { ChevronRight, Verified } from '@mui/icons-material';
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

const ReferralsInviteModal = ({
  service,
  close,
  ...props
}: ReferralsInviteModalProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);
  const { data: tiers } = useTierLevelsQuery();
  const { data: serviceCommission } = useServiceCommissionQuery({
    serviceId: service.id,
  });
  const { data: referral } = useReferralRewardsQuery();

  const [currentDate, setCurrentDate] = useState(new Date());
  const lastTier = tiers?.[tiers?.length - 1];
  const inviteLeft =
    // in case it reached last tier but invites is increased afterwards
    referral?.tierId === lastTier?.id
      ? 0
      : lastTier?.invitees - referral?.investorsCount;
  const boostEndsDate = new Date(referral?.boostEndsAt);
  const boostRunning = isFuture(boostEndsDate);
  const boost = boostRunning ? 2 : referral?.boost;
  const days = differenceInDays(boostEndsDate, currentDate);
  const hours = differenceInHours(boostEndsDate, currentDate) % 24;
  const minutes = differenceInMinutes(boostEndsDate, currentDate) % 60;
  useInterval(
    () => {
      setCurrentDate(new Date());
    },
    boostRunning ? 10000 : null,
  );

  const maxCommission = Math.floor(
    getBoostedCommissionPct(
      tiers?.[tiers?.length - 1]?.commissionPct,
      boost,
      serviceCommission?.commission,
      service.zglySuccessFee,
    ),
  );
  const maxCommissionWithoutTraderBoost = getBoostedCommissionPct(
    tiers?.[tiers?.length - 1]?.commissionPct,
    boost,
    0,
  );
  const traderBoostMultiplier = maxCommission / maxCommissionWithoutTraderBoost;

  const loading = !referral || !tiers || !serviceCommission;

  return (
    <ZModal
      width={838}
      {...props}
      close={close}
      title={t(loading || inviteLeft <= 0 ? 'invite-earn' : 'title', {
        commission: maxCommission,
      })}
      isLoading={loading}
    >
      {!loading && (
        <>
          <Grid container mt={'22px'}>
            <Grid
              item
              sm={12}
              md={4}
              display={'flex'}
              justifyContent={'center'}
              mb={{ sm: 3, md: 0 }}
            >
              <TraderCard
                service={service}
                traderBoost={traderBoostMultiplier}
              />
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
                <Box
                  display='flex'
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <ZigTypography textTransform='uppercase' variant='h4'>
                    {t(
                      referral.investorsCount > 0 && inviteLeft > 0
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
                    {serviceCommission.commission > 0 && (
                      <CommissionBoostChip>
                        <BoostChip boost={traderBoostMultiplier} showBolt />
                      </CommissionBoostChip>
                    )}
                  </ZigTypography>
                </Box>
                {referral.investorsCount > 0 && (
                  <Box display='flex' flexDirection={'column'}>
                    <ZigTypography textTransform='uppercase' variant='h4'>
                      {t('my-invites')}
                    </ZigTypography>
                    <Box display={'flex'} alignItems={'center'} flex={1}>
                      <ZigUserFilledIcon
                        color='#999fe1'
                        width={18}
                        height={21.5}
                      />
                      <ZigTypography
                        variant='h4'
                        color='#999fe1'
                        fontSize={35}
                        pl='9px'
                        pr='7px'
                      >
                        {referral.investorsCount}
                      </ZigTypography>
                      <Verified sx={{ color: '#26c496' }} />
                    </Box>
                  </Box>
                )}
              </Box>
              {inviteLeft > 0 && (
                <>
                  <ZigTypography
                    color='neutral200'
                    variant='h3'
                    fontWeight={400}
                  >
                    <Trans
                      i18nKey={
                        referral.investorsCount > 0
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
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap='9px'
                      mt='11px'
                    >
                      <ZigClockIcon color='#e93ea7' />
                      <ZigTypography
                        color='#e93ea7'
                        variant='h4'
                        fontWeight={400}
                      >
                        {`${t('day', { count: days })}, ${t('hour', {
                          count: hours,
                        })}, ${t('minute', { count: minutes })}`}
                      </ZigTypography>
                    </Box>
                  )}
                </>
              )}

              <Box px='20px'>
                <ShareCommissionSlider
                  discountPct={referral.discountPct}
                  max={maxCommission}
                />
              </Box>
            </Grid>
          </Grid>
          <Box display='flex' gap='22px' mt='44px' px='22px'>
            <ReferralLinkInvite
              serviceId={service.id}
              referralCode={referral.referralCode}
            />
          </Box>
          {inviteLeft > 0 && (
            <Box
              display='flex'
              flexDirection={'column'}
              alignItems={'center'}
              mt='40px'
            >
              <Box display='flex' flexDirection={'column'}>
                {referral.investorsCount > 0 ? (
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
              </Box>
            </Box>
          )}
          <Tiers
            tiers={tiers}
            referral={referral}
            serviceCommission={serviceCommission.commission}
            zignalyCommission={service.zglySuccessFee}
            boost={boost}
            boostRunning={boostRunning}
          />
          <ZigButton
            variant={'text'}
            sx={{ fontSize: '16px !important', marginTop: '31px' }}
            endIcon={
              <ChevronRight
                sx={{ color: 'links', fill: 'currentColor !important' }}
              />
            }
          >
            {t('terms')}
          </ZigButton>
        </>
      )}
    </ZModal>
  );
};

export default ReferralsInviteModal;
