import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    serviceApiKeys: builder.query({
        providesTags: ['ServiceApiKey'],
        query: function (_a) {
            var serviceId = _a.serviceId;
            return ({
                url: "services/".concat(serviceId, "/api_keys"),
            });
        },
    }),
    serviceApiKeyDelete: builder.mutation({
        invalidatesTags: function (result) { return (result ? ['ServiceApiKey'] : []); },
        query: function (_a) {
            var serviceId = _a.serviceId, keyId = _a.keyId, code = _a.code;
            return ({
                method: 'DELETE',
                url: "services/".concat(serviceId, "/api_keys/").concat(keyId),
                body: { code: code },
            });
        },
    }),
    serviceApiKeyEdit: builder.mutation({
        invalidatesTags: function (result) { return (result ? ['ServiceApiKey'] : []); },
        query: function (_a) {
            var serviceId = _a.serviceId, keyId = _a.keyId, data = _a.data;
            return ({
                method: 'PUT',
                url: "services/".concat(serviceId, "/api_keys/").concat(keyId),
                body: data,
            });
        },
    }),
    serviceApiKeyCreate: builder.mutation({
        invalidatesTags: function (result) { return (result ? ['ServiceApiKey'] : []); },
        query: function (_a) {
            var serviceId = _a.serviceId, alias = _a.alias, code = _a.code;
            return ({
                method: 'POST',
                url: "services/".concat(serviceId, "/api_keys"),
                body: { alias: alias, code: code },
            });
        },
    }),
}); });
export var useServiceApiKeyCreateMutation = api.useServiceApiKeyCreateMutation, useServiceApiKeyDeleteMutation = api.useServiceApiKeyDeleteMutation, useServiceApiKeyEditMutation = api.useServiceApiKeyEditMutation, useServiceApiKeysQuery = api.useServiceApiKeysQuery, useLazyServiceApiKeysQuery = api.useLazyServiceApiKeysQuery;
//# sourceMappingURL=api.js.map