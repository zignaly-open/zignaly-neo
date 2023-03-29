import { Reward, RewardClaimed } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  rewards: builder.query<Reward[], undefined>({
    query: () => ({
      url: `benefits/list`,
    }),
  }),
  rewardsClaimed: builder.query<RewardClaimed[], undefined>({
    query: () => ({
      url: `benefits/list`,
    }),
  }),
}));

export const { useRewardsQuery, useRewardsClaimedQuery } = api;
