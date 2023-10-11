import { isFuture } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'react-use';
import {
  useReferralRewardsQuery,
  useServiceCommissionQuery,
  useTierLevelsQuery,
} from './api';
import {
  getBoostedCommissionPct,
  getServiceCommission,
  getTraderBoost,
} from 'views/TraderService/components/ReferralsInviteModal/util';
import { useIsAuthenticated } from 'apis/user/use';
import { useServiceDetails } from 'apis/service/use';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

const DEFAULT_SERVICE_COMMISSION = 10;
const DEFAULT_USER_BOOST = 2;

export function useTiersData(serviceId?: string) {
  const isAuthenticated = useIsAuthenticated();
  const featureOn = isFeatureOn(Features.Referrals);
  const {
    data: tiers,
    isError: isErrorTiers,
    refetch: refetchTiers,
  } = useTierLevelsQuery(undefined, { skip: !featureOn });
  const {
    data: serviceCommissionData,
    isError: isErrorCommissions,
    refetch: refetchServiceCommissions,
    isLoading: serviceCommissionLoading,
  } = useServiceCommissionQuery(
    {
      serviceId: serviceId,
    },
    {
      skip: !serviceId || !featureOn,
    },
  );
  const { data: serviceData, isLoading: serviceLoading } = useServiceDetails(
    serviceId,
    {
      skip: !serviceId || !featureOn,
    },
  );

  const serviceCommissionRaw = serviceId
    ? serviceCommissionData?.commission
    : DEFAULT_SERVICE_COMMISSION;
  const traderBoost = getTraderBoost(
    serviceCommissionRaw,
    serviceData?.zglySuccessFee,
  );
  const serviceCommission = getServiceCommission(
    serviceCommissionRaw,
    serviceData?.zglySuccessFee,
  );
  const {
    data: referral,
    isLoading: referralLoading,
    isError: isErrorReferrakRewards,
    refetch: refetchRewards,
  } = useReferralRewardsQuery(undefined, {
    skip: !isAuthenticated || !featureOn,
    // todo: reset referral state in clearUserSession
    refetchOnMountOrArgChange: true,
  });

  const boostEndsDate = new Date(referral?.boostEndsAt);
  const boostRunning = isFuture(boostEndsDate);
  const [currentDate, setCurrentDate] = useState(new Date());
  const boost = boostRunning
    ? DEFAULT_USER_BOOST
    : referral?.boost ?? DEFAULT_USER_BOOST;
  const lastTier = tiers?.[tiers?.length - 1];
  const currentTier = tiers?.[referral?.tierId];
  const inviteLeft =
    // in case it reached last tier but invites is increased afterwards
    referral?.tierId === lastTier?.id
      ? 0
      : lastTier?.invitees - referral?.investorsCount;

  const maxCommission = Math.floor(
    getBoostedCommissionPct(lastTier?.commissionPct, boost, traderBoost),
  );

  const maxCommissionWithoutTraderBoost = getBoostedCommissionPct(
    lastTier?.commissionPct,
    boost,
  );

  const commission = Math.floor(
    getBoostedCommissionPct(currentTier?.commissionPct, boost, traderBoost),
  );

  useInterval(
    () => {
      setCurrentDate(new Date());
    },
    boostRunning ? 10000 : null,
  );

  const isError = isErrorCommissions || isErrorTiers || isErrorReferrakRewards;

  return {
    currentDate,
    boostEndsDate,
    boostRunning,
    isError,
    isLoading:
      featureOn &&
      !isError &&
      (!tiers || serviceCommissionLoading || referralLoading || serviceLoading),
    tiers,
    referral,
    boost,
    inviteLeft,
    refetch: () => {
      refetchTiers();
      refetchRewards();
      refetchServiceCommissions();
    },
    maxCommission,
    maxCommissionWithoutTraderBoost,
    commission,
    serviceCommission,
    serviceCommissionRaw,
    traderBoost,
  };
}
