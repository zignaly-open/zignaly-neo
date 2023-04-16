import { injectEndpoints } from 'apis/util';
import baseApiPs2 from '../baseApiPs2';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    investments: builder.query({
        query: function (exchangeInternalId) { return ({
            url: "user/exchanges/".concat(exchangeInternalId, "/investments"),
        }); },
        providesTags: ['Investment'],
    }),
    withdrawInvestment: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            'Balance',
            'Investment',
            'Marketplace',
            { type: 'Service', id: args.serviceId },
        ]; },
        query: function (_a) {
            var serviceId = _a.serviceId, amount = _a.amount, exchangeInternalId = _a.exchangeInternalId;
            return ({
                url: "services/".concat(serviceId, "/investments/out"),
                method: 'POST',
                body: {
                    exchangeInternalId: exchangeInternalId,
                    amount: amount,
                },
            });
        },
    }),
    investedAmount: builder.query({
        query: function (serviceId) { return ({
            url: "user/exchanges/".concat(serviceId, "/invested"),
            method: 'GET',
        }); },
        providesTags: ['Investment'],
    }),
    updateTakeProfit: builder.mutation({
        invalidatesTags: ['Investment'],
        query: function (_a) {
            var serviceId = _a.serviceId, profitPercentage = _a.profitPercentage, exchangeInternalId = _a.exchangeInternalId;
            return ({
                url: "services/".concat(serviceId, "/investments/percentage"),
                method: 'POST',
                body: {
                    exchangeInternalId: exchangeInternalId,
                    profitPercent: profitPercentage,
                },
            });
        },
    }),
    investInService: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            'Balance',
            'Investment',
            { type: 'Service', id: args.serviceId },
            'Marketplace',
        ]; },
        query: function (_a) {
            var serviceId = _a.serviceId, profitPercentage = _a.profitPercentage, exchangeInternalId = _a.exchangeInternalId, amount = _a.amount;
            return ({
                url: "services/".concat(serviceId, "/investments/in"),
                method: 'POST',
                body: {
                    exchangeInternalId: exchangeInternalId,
                    profitPercent: profitPercentage,
                    amount: amount,
                },
            });
        },
    }),
    updateTakeProfitAndInvestMore: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            'Balance',
            'Investment',
            'Marketplace',
            { type: 'Service', id: args.serviceId },
        ]; },
        query: function (_a) {
            var serviceId = _a.serviceId, profitPercentage = _a.profitPercentage, exchangeInternalId = _a.exchangeInternalId, amount = _a.amount;
            return ({
                url: "services/".concat(serviceId, "/investments/in"),
                method: 'POST',
                body: {
                    exchangeInternalId: exchangeInternalId,
                    profitPercent: profitPercentage,
                    amount: amount,
                },
            });
        },
    }),
    investmentDetails: builder.query({
        query: function (_a) {
            var exchangeInternalId = _a.exchangeInternalId, serviceId = _a.serviceId;
            return ({
                url: "user/exchanges/".concat(exchangeInternalId, "/").concat(serviceId),
            });
        },
        providesTags: ['Investment'],
        extraOptions: {
            silent: true,
        },
    }),
}); });
export var useInvestmentsQuery = api.useInvestmentsQuery, useInvestedAmountQuery = api.useInvestedAmountQuery, useUpdateTakeProfitAndInvestMoreMutation = api.useUpdateTakeProfitAndInvestMoreMutation, useUpdateTakeProfitMutation = api.useUpdateTakeProfitMutation, useInvestInServiceMutation = api.useInvestInServiceMutation, useWithdrawInvestmentMutation = api.useWithdrawInvestmentMutation, useInvestmentDetailsQuery = api.useInvestmentDetailsQuery;
//# sourceMappingURL=api.js.map