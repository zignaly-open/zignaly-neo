import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography, trimZeros } from '@zignaly-open/ui';
import { ReferralsInviteModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid } from '@mui/material';
import Tiers from './atoms/TiersTable';
import { ShareCommissionSlider } from './atoms/ShareCommissionSlider';
import { DescriptionLine } from './atoms/DescriptionLine';
import TraderCard from './atoms/TraderCard';
import ReferralLinkInvite from './atoms/ReferralLinkInvite';
import { useTiersData } from 'apis/referrals/use';
import CurrentCommission from './atoms/CurrentCommission';
import ReferralTermsButton from './atoms/ReferralTermsButton';

const ReferralsInviteModal = ({
  service,
  close,
  ...props
}: ReferralsInviteModalProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);
  const tiersData = useTiersData(service.id);
  const {
    tiers,
    referral,
    serviceCommission,
    boostRunning,
    boost,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    inviteLeft,
    isLoading,
  } = tiersData;

  return (
    <ZModal
      titleStyles={{ fontSize: '26px', textTransform: 'unset !important' }}
      width={838}
      {...props}
      close={close}
      title={t(isLoading || inviteLeft <= 0 ? 'invite-earn' : 'title', {
        commission: maxCommission,
      })}
      isLoading={isLoading}
    >
      {!isLoading && (
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
              <TraderCard service={service} traderBoost={traderBoost} />
            </Grid>
            <Grid
              item
              sm={12}
              md={8}
              display='flex'
              flexDirection={'column'}
              alignItems={'center'}
            >
              <CurrentCommission
                tiersData={tiersData}
                showReferrals={referral.investorsCount > 0}
                showMaxCommission={inviteLeft > 0}
              />
              <Box px='20px'>
                <ShareCommissionSlider
                  discountPct={referral.discountPct}
                  max={maxCommission}
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt='44px'>
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
                    fontWeight={500}
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
                      id='referrals-invite-modal__earn-success-fees'
                    />
                    {!boostRunning && !serviceCommission && (
                      <DescriptionLine
                        text={t('invite-and-earn', {
                          invite: inviteLeft,
                          commission: maxCommission,
                        })}
                        tooltip={t('tooltips.invite-and-earn', {
                          invite: inviteLeft,
                          commission: maxCommission,
                        })}
                        id='referrals-invite-modal__invite-and-earn'
                      />
                    )}
                    {boostRunning && (
                      <DescriptionLine
                        text={t('invite-and-earn-1-week', {
                          invite: inviteLeft,
                          commission: maxCommissionWithoutTraderBoost,
                        })}
                        tooltip={t('tooltips.invite-and-earn-1-week', {
                          invite: inviteLeft,
                          commission: maxCommissionWithoutTraderBoost,
                        })}
                        id='referrals-invite-modal__invite-and-earn-1-week'
                      />
                    )}
                    {traderBoost > 0 && (
                      <DescriptionLine
                        text={t('invite-and-earn-trader-boost', {
                          invite: inviteLeft,
                          commissionBefore: trimZeros(
                            maxCommissionWithoutTraderBoost,
                          ),
                          commission: maxCommission,
                          multiplier: traderBoost + 1,
                        })}
                        tooltip={t('tooltips.invite-and-earn', {
                          invite: inviteLeft,
                          commission: maxCommission,
                        })}
                        id='referrals-invite-modal__invite-and-earn-trader-boost'
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
              traderBoost={traderBoost}
              boost={boost}
              boostRunning={boostRunning}
            />
          </Box>

          <Box mt='24px' textAlign={'center'}>
            <ReferralTermsButton />
          </Box>
        </>
      )}
    </ZModal>
  );
};

export default ReferralsInviteModal;
