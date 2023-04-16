import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';
export var api = createApi({
    baseQuery: baseQuery(process.env.REACT_APP_REFERRALS_API),
    reducerPath: 'referralApi',
    tagTypes: ['Referrals'],
    endpoints: function (builder) { return ({
        benefits: builder.query({
            query: function () { return ({
                url: 'v1/benefit/list',
            }); },
        }),
        benefitsClaimed: builder.query({
            query: function () { return ({
                url: 'v1/benefit/history',
            }); },
        }),
        referralRewards: builder.query({
            query: function () { return ({
                url: 'v1/referrer/data',
            }); },
        }),
        referralHistory: builder.query({
            query: function () { return ({
                url: 'v1/referrer/history',
            }); },
        }),
    }); },
});
export var useBenefitsClaimedQuery = api.useBenefitsClaimedQuery, useBenefitsQuery = api.useBenefitsQuery, useReferralHistoryQuery = api.useReferralHistoryQuery, useReferralRewardsQuery = api.useReferralRewardsQuery;
//# sourceMappingURL=api.js.map