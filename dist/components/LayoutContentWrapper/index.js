import React from 'react';
import CenteredLoader from '../CenteredLoader';
import CriticalError from '../Stub/CriticalError';
import NoData from '../Stub/NoData';
var LayoutContentWrapper = function (_a) {
    var _b;
    var endpoint = _a.endpoint, content = _a.content, error = _a.error, _c = _a.unmountOnRefetch, unmountOnRefetch = _c === void 0 ? false : _c;
    var isArray = Array.isArray(endpoint);
    var endpoints = isArray ? endpoint : [endpoint];
    var someError = (_b = endpoints.find(function (x) { return x.error; })) === null || _b === void 0 ? void 0 : _b.error;
    var isLoading = endpoints.some(function (x) { return x.isLoading; });
    var isFetching = endpoints.some(function (x) { return x.isFetching; });
    var data = endpoints.every(function (x) { return x.data; }) && endpoints.map(function (x) { return x.data; });
    if (isLoading || (unmountOnRefetch && isFetching))
        return React.createElement(CenteredLoader, null);
    if (someError && error)
        return error(someError);
    if (someError)
        return React.createElement(CriticalError, null);
    if (!data)
        return React.createElement(NoData, null);
    return content((isArray ? data : data[0]));
};
export default LayoutContentWrapper;
//# sourceMappingURL=index.js.map