import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  ZigButton,
  ZigTypography,
  ZigUserFilledIcon,
  trimZeros,
} from '@zignaly-open/ui';
import { ReferralsInviteModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid, Tooltip } from '@mui/material';
import { CommissionBoostChip } from './styles';
import Tiers from './atoms/TiersTable';
import { ChevronRight, Verified } from '@mui/icons-material';
import BoostChip from './atoms/BoostChip';
import { ShareCommissionSlider } from './atoms/ShareCommissionSlider';
import { DescriptionLine } from './atoms/DescriptionLine';
import TraderCard from './atoms/TraderCard';
import ReferralLinkInvite from './atoms/ReferralLinkInvite';
import BoostTimer from './atoms/BoostTimer';
import { useTiersData } from 'apis/referrals/use';

const ReferralsInviteModal = ({
  service,
  close,
  ...props
}: ReferralsInviteModalProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);
  const {
    tiers,
    referral,
    serviceCommission,
    boostEndsDate,
    currentDate,
    boostRunning,
    boost,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoostMultiplier,
    inviteLeft,
  } = useTiersData(service.id, service.zglySuccessFee);

  const loading = !referral || !tiers || !serviceCommission;

  return (
    <ZModal
      titleStyles={{ fontSize: '26px', textTransform: 'unset !important' }}
      width={838}
      {...props}
      close={close}
      title={t(loading || inviteLeft <= 0 ? 'invite-earn' : 'title', {
        commission: maxCommission,
      })}
      isLoading={loading}
      sx={{
        // Hack to make the box shadow visible beyond the container
        // despite the staking context created by the scrollbar
        '> div': {
          paddingTop: '28px',
        },
        '> div > div:first-child': {
          marginBottom: '2px',
        },
        '> div > div:last-child': {
          m: '0px -48px 0',
          p: '0px 48px 0',
          width: 'calc(100% + 96px)',
        },
      }}
    >
      {!loading && (
        <>
          <Grid container mt={'38px'}>
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
              <Box
                display={'flex'}
                width={1}
                justifyContent={'space-evenly'}
                mb={'15px'}
              >
                <Box
                  display='flex'
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Box position={'relative'}>
                    <ZigTypography textTransform='uppercase' variant='h4'>
                      {t(
                        referral.investorsCount > 0 && inviteLeft > 0
                          ? 'max-commission'
                          : 'commission-rate',
                      )}
                    </ZigTypography>
                    <Tooltip
                      title={t(
                        referral.investorsCount > 0 && inviteLeft > 0
                          ? 'tooltips.max-commission'
                          : 'tooltips.commission-rate',
                      )}
                    >
                      <Box
                        component='img'
                        sx={{
                          position: 'absolute',
                          width: '10px',
                          right: -13,
                          top: -5,
                          zIndex: 1,
                        }}
                        src={`/images/portfolio/info-icon.svg`}
                      />
                    </Tooltip>
                  </Box>
                  <ZigTypography
                    color='#28ba62'
                    letterSpacing='1.49px'
                    fontSize={50}
                    fontWeight={600}
                    pt='20px'
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
                    <Box position={'relative'}>
                      <ZigTypography textTransform='uppercase' variant='h4'>
                        {t('my-referrals')}
                      </ZigTypography>
                      <Tooltip title={t('tooltips.number-referrals')}>
                        <Box
                          component='img'
                          sx={{
                            position: 'absolute',
                            width: '10px',
                            right: -13,
                            top: -5,
                            zIndex: 1,
                          }}
                          src={`/images/portfolio/info-icon.svg`}
                        />
                      </Tooltip>
                    </Box>

                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      flex={1}
                      pt={'5px'}
                    >
                      <ZigUserFilledIcon
                        color='#999fe1'
                        width={18}
                        height={21.5}
                      />
                      <ZigTypography
                        fontWeight={600}
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
                    <BoostTimer
                      boostEndsDate={boostEndsDate}
                      currentDate={currentDate}
                    />
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
                    color={'neutral100'}
                  >
                    {t('invite-more', {
                      invite: inviteLeft,
                      commission: maxCommission,
                    })}
                  </ZigTypography>
                ) : (
                  <>
                    <DescriptionLine
                      text={t('earn-success-fees')}
                      tooltip={t('tooltips.earn-success-fees')}
                    />
                    {!boostRunning && !serviceCommission.commission && (
                      <DescriptionLine
                        text={t('invite-and-earn', {
                          invite: inviteLeft,
                          commission: maxCommission,
                        })}
                        tooltip={t('tooltips.invite-and-earn')}
                      />
                    )}
                    {boostRunning && (
                      <DescriptionLine
                        text={t('invite-and-earn-1-week', {
                          invite: inviteLeft,
                          commission: maxCommissionWithoutTraderBoost,
                        })}
                        tooltip={t('tooltips.invite-and-earn-1-week')}
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
          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Tiers
              tiers={tiers}
              referral={referral}
              serviceCommission={serviceCommission.commission}
              zignalyCommission={service?.zglySuccessFee || 5}
              boost={boost}
              boostRunning={boostRunning}
            />
          </Box>

          <ZigButton
            variant={'text'}
            sx={{ fontSize: '16px !important', marginTop: '61px' }}
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
