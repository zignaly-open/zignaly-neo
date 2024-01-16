import {
  GraphChartType,
  GraphTimeframe,
  Investor,
  TraderService,
  TraderServiceBalance,
  TraderServiceManagement,
  TraderServiceChart,
  TransferPayload,
  EditServicePayload,
  CreateServicePayload,
  ServiceTypesInfo,
  Service,
  ZScoreInfo,
} from './types';
import { injectEndpoints, providesList } from 'apis/util';
import baseApiPs2 from '../baseApiPs2';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  traderServices: builder.query<TraderService[], void>({
    query: () => ({
      url: 'services/list',
    }),
    providesTags: (result) => providesList(result, 'Service', 'serviceId'),
  }),
  traderServiceDetails: builder.query<Service, string>({
    providesTags: (result, error, id) => [{ type: 'Service', id }],
    query: (id) => ({
      url: `services/${id}`,
    }),
  }),
  traderServiceGraph: builder.query<
    TraderServiceChart,
    { id: string; period: GraphTimeframe; chart: GraphChartType }
  >({
    providesTags: (result, error, { id }) => [{ type: 'ServiceChart', id }],
    query: ({ id, chart, period }) => ({
      url: `services/${id}/stats`,
      params: { chart, period },
    }),
  }),
  traderServiceManagement: builder.query<TraderServiceManagement, string>({
    providesTags: (result, error, id) => [{ type: 'Service', id }],
    query: (id) => ({
      url: `services/${id}/management`,
    }),
  }),
  traderServiceBalance: builder.query<TraderServiceBalance, string>({
    providesTags: (result, error, id) => [{ type: 'Service', id }],
    query: (id) => ({
      url: `services/${id}/balances`,
    }),
  }),
  traderServiceInvestors: builder.query<Investor[], string>({
    providesTags: ['ServiceInvestors'],
    query: (id) => ({
      url: `services/${id}/investors`,
    }),
  }),
  traderServiceUpdateScaMinimum: builder.mutation<
    void,
    { minimum: string; serviceId: string }
  >({
    invalidatesTags: (result, error, args) => [
      { type: 'Service', id: args.serviceId },
    ],
    query: ({ serviceId, minimum }) => ({
      url: `services/${serviceId}/sca`,
      method: 'PUT',
      body: { minimum },
    }),
  }),
  createTraderService: builder.mutation<Service, CreateServicePayload>({
    invalidatesTags: ['Service'],
    query: (payload) => ({
      url: `services`,
      method: 'POST',
      body: payload,
    }),
  }),
  traderServiceTypesInfo: builder.query<ServiceTypesInfo, void>({
    query: () => ({
      url: `service-types`,
    }),
  }),
  traderServiceTransferFunds: builder.mutation<
    void,
    { serviceId: string } & TransferPayload
  >({
    invalidatesTags: (result, error, args) => [
      { type: 'Service', id: args.serviceId },
    ],
    query: ({ serviceId, ...payload }) => ({
      url: `services/${serviceId}/transfer`,
      method: 'POST',
      body: payload,
    }),
  }),
  traderServiceEditSuccessFee: builder.mutation<
    void,
    { accountId: string; discount: number; serviceId: string }
  >({
    invalidatesTags: (result, error) => (error ? [] : ['ServiceInvestors']),
    query: ({ discount, serviceId, accountId }) => ({
      url: `services/${serviceId}/owner_sf_discount`,
      method: 'PUT',
      body: {
        discount,
        accountId,
      },
    }),
  }),
  traderServiceEdit: builder.mutation<void, EditServicePayload>({
    invalidatesTags: (result, error, args) => [
      { type: 'Service', id: args.id },
      'Marketplace',
    ],
    query: ({ id, ...payload }) => ({
      url: `services/${id}`,
      method: 'PUT',
      body: payload,
    }),
  }),
  score: builder.query<ZScoreInfo, string>({
    query: (id) => ({
      url: `services/${id}/score-info`,
    }),
  }),
}));

export const {
  useTraderServiceInvestorsQuery,
  useLazyTraderServiceInvestorsQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceBalanceQuery,
  useTraderServiceGraphQuery,
  useTraderServiceManagementQuery,
  useCreateTraderServiceMutation,
  useTraderServiceTypesInfoQuery,
  useTraderServiceUpdateScaMinimumMutation,
  useLazyTraderServicesQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServicesQuery,
  useTraderServiceEditSuccessFeeMutation,
  useTraderServiceEditMutation,
  useScoreQuery,
} = api;
