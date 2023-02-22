import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ComingSoon from '../../components/Stub/ComingSoon';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';

const Referrals: React.FC = () => {
  const { t } = useTranslation('pages');
  const rewards = useReferralRewardsQuery();
  const history = useReferralHistoryQuery();
  console.error(rewards, history);

  useTitle(t('referrals'));
  return <ComingSoon />;
};

export default Referrals;
