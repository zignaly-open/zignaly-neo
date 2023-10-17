import { DialogProps, Box } from '@mui/material';
import { TiersData } from 'apis/referrals/types';
import ZModal from 'components/ZModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TiersTable from 'views/TraderService/components/ReferralsInviteModal/atoms/TiersTable';
import ReferralDescriptionLines from './ReferralDescriptionLines';
import ReferralTermsButton from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralTermsButton';

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
    boostRunning,
    boost,
    maxCommission,
    traderBoost,
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
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          mt='6px'
        >
          <ReferralDescriptionLines tiersData={tiersData} />
          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <TiersTable
              tiers={tiers}
              referral={referral}
              traderBoost={traderBoost}
              boost={boost}
              boostRunning={boostRunning}
            />
          </Box>

          <Box mt='33px'>
            <ReferralTermsButton />
          </Box>
        </Box>
      )}
    </ZModal>
  );
};

export default ReferralTiersModal;
