import { isFuture } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'react-use';
import {
  useReferralRewardsQuery,
  useServiceCommissionQuery,
  useTierLevelsQuery,
} from './api';
import { getBoostedCommissionPct } from 'views/TraderService/components/ReferralsInviteModal/util';
import { useIsAuthenticated } from 'apis/user/use';

export function useTiersData(serviceId?: string, zglySuccessFee = 5) {
  const isAuthenticated = useIsAuthenticated();
  const { data: tiers } = useTierLevelsQuery();
  const { data: serviceCommissionData } = useServiceCommissionQuery(
    {
      serviceId: serviceId,
    },
    {
      skip: !serviceId,
    },
  );
  const serviceCommission = serviceId ? serviceCommissionData?.commission : 10;
  const { data: referral, isLoading: referralLoading } =
    useReferralRewardsQuery(undefined, {
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
    getBoostedCommissionPct(
      lastTier?.commissionPct,
      boost,
      serviceCommission,
      zglySuccessFee,
    ),
  );

  const maxCommissionWithoutTraderBoost = getBoostedCommissionPct(
    tiers?.[tiers?.length - 1]?.commissionPct,
    boost,
    0,
  );

  const commission = Math.floor(
    getBoostedCommissionPct(
      currentTier?.commissionPct,
      boost,
      serviceCommission,
      zglySuccessFee,
    ),
  );

  const traderBoostMultiplier = maxCommission / maxCommissionWithoutTraderBoost;

  useInterval(
    () => {
      setCurrentDate(new Date());
    },
    boostRunning ? 10000 : null,
  );

  return {
    currentDate,
    boostEndsDate,
    boostRunning,
    isLoading: !tiers || serviceCommission === undefined || referralLoading,
    tiers,
    serviceCommission,
    referral,
    boost,
    inviteLeft,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    commission,
    traderBoostMultiplier,
  };
}
