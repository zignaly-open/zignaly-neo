var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { injectEndpoints, providesList } from 'apis/util';
import baseApiPs2 from '../baseApiPs2';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    traderServices: builder.query({
        query: function () { return ({
            url: 'services/list',
        }); },
        providesTags: function (result) { return providesList(result, 'Service', 'serviceId'); },
    }),
    traderServiceDetails: builder.query({
        providesTags: function (result, error, id) { return [{ type: 'Service', id: id }]; },
        query: function (id) { return ({
            url: "services/".concat(id),
        }); },
    }),
    traderServiceGraph: builder.query({
        providesTags: function (result, error, _a) {
            var id = _a.id;
            return [{ type: 'ServiceChart', id: id }];
        },
        query: function (_a) {
            var id = _a.id, chart = _a.chart, period = _a.period;
            return ({
                url: "services/".concat(id, "/stats"),
                params: { chart: chart, period: period },
            });
        },
    }),
    traderServiceManagement: builder.query({
        providesTags: function (result, error, id) { return [{ type: 'Service', id: id }]; },
        query: function (id) { return ({
            url: "services/".concat(id, "/management"),
        }); },
    }),
    traderServiceBalance: builder.query({
        providesTags: function (result, error, id) { return [{ type: 'Service', id: id }]; },
        query: function (id) { return ({
            url: "services/".concat(id, "/balances"),
        }); },
    }),
    traderServiceInvestors: builder.query({
        providesTags: function (result, error, id) { return [{ type: 'Service', id: id }]; },
        query: function (id) { return ({
            url: "services/".concat(id, "/investors"),
        }); },
    }),
    traderServiceUpdateScaMinimum: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            { type: 'Service', id: args.serviceId },
        ]; },
        query: function (_a) {
            var serviceId = _a.serviceId, minimum = _a.minimum;
            return ({
                url: "services/".concat(serviceId, "/sca"),
                method: 'PUT',
                body: { minimum: minimum },
            });
        },
    }),
    createTraderService: builder.mutation({
        invalidatesTags: ['Service'],
        query: function (payload) { return ({
            url: "services",
            method: 'POST',
            body: payload,
        }); },
    }),
    traderServiceTypesInfo: builder.query({
        query: function () { return ({
            url: "service-types",
        }); },
    }),
    traderServiceTransferFunds: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            { type: 'Service', id: args.serviceId },
        ]; },
        query: function (_a) {
            var serviceId = _a.serviceId, payload = __rest(_a, ["serviceId"]);
            return ({
                url: "services/".concat(serviceId, "/transfer"),
                method: 'POST',
                body: payload,
            });
        },
    }),
    traderServiceEdit: builder.mutation({
        invalidatesTags: function (result, error, args) { return [
            { type: 'Service', id: args.id },
            'Marketplace',
        ]; },
        query: function (_a) {
            var id = _a.id, payload = __rest(_a, ["id"]);
            return ({
                url: "services/".concat(id),
                method: 'PUT',
                body: payload,
            });
        },
    }),
}); });
export var useTraderServiceInvestorsQuery = api.useTraderServiceInvestorsQuery, useLazyTraderServiceInvestorsQuery = api.useLazyTraderServiceInvestorsQuery, useTraderServiceDetailsQuery = api.useTraderServiceDetailsQuery, useTraderServiceBalanceQuery = api.useTraderServiceBalanceQuery, useTraderServiceGraphQuery = api.useTraderServiceGraphQuery, useTraderServiceManagementQuery = api.useTraderServiceManagementQuery, useCreateTraderServiceMutation = api.useCreateTraderServiceMutation, useTraderServiceTypesInfoQuery = api.useTraderServiceTypesInfoQuery, useTraderServiceUpdateScaMinimumMutation = api.useTraderServiceUpdateScaMinimumMutation, useLazyTraderServicesQuery = api.useLazyTraderServicesQuery, useTraderServiceTransferFundsMutation = api.useTraderServiceTransferFundsMutation, useTraderServicesQuery = api.useTraderServicesQuery, useTraderServiceEditMutation = api.useTraderServiceEditMutation;
//# sourceMappingURL=api.js.map