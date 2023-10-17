import { NorthEast } from '@mui/icons-material';
import { DialogProps, Grid, Box } from '@mui/material';
import { ZigTypography, trimZeros, ZigButton } from '@zignaly-open/ui';
import { TiersData } from 'apis/referrals/types';
import { useTiersData } from 'apis/referrals/use';
import ZModal from 'components/ZModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HELP_REFERRAL } from 'util/constants';
import CurrentCommission from 'views/TraderService/components/ReferralsInviteModal/CurrentCommission';
import { DescriptionLine } from 'views/TraderService/components/ReferralsInviteModal/atoms/DescriptionLine';
import ReferralLinkInvite from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite';
import { ShareCommissionSlider } from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider';
import TiersTable from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import TraderCard from 'views/TraderService/components/ReferralsInviteModal/atoms/TraderCard';

type ReferralTiersModalProps = {
  tiersData: TiersData;
} & DialogProps;

const ReferralTiersModal = ({
  tiersData,
  ...props
}: ReferralTiersModalProps) => {
  const { t } = useTranslation(['referrals-trader', 'referrals']);
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
      width={838}
      {...props}
      title={t('how-to-earn', { commission: maxCommission, ns: 'referrals' })}
      isLoading={isLoading}
    >
      {!isLoading && (
        <>
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
            <TiersTable
              tiers={tiers}
              referral={referral}
              traderBoost={traderBoost}
              boost={boost}
              boostRunning={boostRunning}
            />
          </Box>

          <ZigButton
            variant={'text'}
            sx={{ fontSize: '16px !important', marginTop: '61px' }}
            endIcon={
              <NorthEast
                sx={{
                  color: 'links',
                  fill: 'currentColor !important',
                  fontSize: '16px !important',
                }}
              />
            }
            id='referrals-invite-modal__terms-link'
            href={HELP_REFERRAL}
            target='_blank'
            rel='noopener'
          >
            {t('terms')}
          </ZigButton>
        </>
      )}
    </ZModal>
  );
};

export default ReferralTiersModal;
