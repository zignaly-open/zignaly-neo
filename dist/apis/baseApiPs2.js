import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'apis/baseQuery';
var baseApiPs2 = createApi({
    reducerPath: 'ps2Api',
    baseQuery: baseQuery(),
    endpoints: function () { return ({}); },
    tagTypes: [
        'ServiceApiKey',
        'Service',
        'ServiceChart',
        'Marketplace',
        'Investment',
        'Balance',
    ],
});
export default baseApiPs2;
//# sourceMappingURL=baseApiPs2.js.map