import React from 'react';
import { TiersCardBox } from '../styles';
import { Box, useTheme } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import MiniTierBar from 'views/TraderService/components/ReferralsInviteModal/atoms/MiniTierBar';
import { ChevronRight } from '@mui/icons-material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ZigUserFilledIcon } from '@zignaly-open/ui/icons';
import BoostTimer from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostTimer';
import { TiersData } from 'apis/referrals/types';
import { composeInvitesValue } from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import { useZModal } from 'components/ZModal/use';
import ReferralTiersModal from './ReferralTiersModal';

const ReferralTiersCard = ({ tiersData }: { tiersData: TiersData }) => {
  const { t } = useTranslation('referrals');
  const theme = useTheme();
  const { showModal } = useZModal();

  const {
    referral,
    maxCommissionWithoutTraderBoost,
    boostRunning,
    currentDate,
    boostEndsDate,
    tiers,
    boost,
  } = tiersData;

  return (
    <TiersCardBox>
      {boostRunning && (
        <BoostTimer boostEndsDate={boostEndsDate} currentDate={currentDate} />
      )}
      <ZigTypography
        fontSize={14}
        fontWeight={500}
        textAlign={'center'}
        mt='5px'
        lineHeight={'19px'}
      >
        <Trans
          i18nKey={boostRunning ? 'invite-people-1-week' : 'invite-people'}
          t={t}
          values={{
            invite: tiers[tiers.length - 1].invitees,
            commission: maxCommissionWithoutTraderBoost,
          }}
        >
          <ZigTypography color='#25b990' fontWeight={600} />
        </Trans>
      </ZigTypography>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-end'}
        mt={!boostRunning ? '12px' : '2px'}
      >
        {tiers?.map((tier, tierIndex) => (
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            key={tier.id}
          >
            <MiniTierBar
              maxHeight={88}
              minHeight={20}
              showArrow={tierIndex === tiers.length - 1}
              tier={tier}
              referral={referral}
              tiers={tiers}
              traderBoost={0}
              boost={boost}
              boostRunning={boostRunning}
            />
            <Box
              display={'flex'}
              alignItems={'center'}
              gap='4px'
              justifyContent='center'
              mt={'-12px'}
              zIndex={2}
            >
              <ZigTypography
                fontWeight={500}
                fontSize={12}
                color='neutral200'
                id='tier-chart__referrals-count'
              >
                {composeInvitesValue(tierIndex, tiers, false)}
              </ZigTypography>
              <ZigUserFilledIcon
                color={theme.palette.neutral300}
                height={9.5}
                width={8}
                style={{ marginTop: '-1px' }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <ZigButton
        variant={'text'}
        sx={{ fontSize: '12px !important', marginTop: '12px' }}
        endIcon={
          <ChevronRight
            sx={{
              color: 'links',
              fill: 'currentColor !important',
              fontSize: '16px !important',
            }}
          />
        }
        id='referrals-tiers-card__terms-link'
        onClick={() => {
          showModal(ReferralTiersModal, {
            tiersData,
          });
        }}
      >
        {t('how-it-works')}
      </ZigButton>
    </TiersCardBox>
  );
};

export default ReferralTiersCard;
