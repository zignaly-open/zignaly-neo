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

export function useTiersData(serviceId?: string) {
  const isAuthenticated = useIsAuthenticated();
  const {
    data: tiers,
    isError: isErrorTiers,
    refetch: refetchTiers,
  } = useTierLevelsQuery();
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
      skip: !serviceId,
    },
  );
  const { data: serviceData, isLoading: serviceLoading } = useServiceDetails(
    serviceId,
    {
      skip: !serviceId,
    },
  );

  const serviceCommissionRaw = serviceId
    ? serviceCommissionData?.commission
    : 10;
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
    skip: !isAuthenticated,
    // todo: reset referral state in clearUserSession
    refetchOnMountOrArgChange: true,
  });

  const boostEndsDate = new Date(referral?.boostEndsAt);
  const boostRunning = isFuture(boostEndsDate);
  const [currentDate, setCurrentDate] = useState(new Date());
  const boost = boostRunning ? 2 : referral?.boost;
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
    tiers?.[tiers?.length - 1]?.commissionPct,
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
