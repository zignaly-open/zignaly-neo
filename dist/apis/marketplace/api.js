import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    marketplace: builder.query({
        providesTags: ['Marketplace'],
        query: function () { return ({
            url: 'marketplace/',
        }); },
    }),
}); });
export var useMarketplaceQuery = api.useMarketplaceQuery;
//# sourceMappingURL=api.js.map