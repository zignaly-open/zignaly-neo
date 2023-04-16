var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var providesList = function (resultsWithIds, tagType, idKey) {
    if (idKey === void 0) { idKey = 'id'; }
    return resultsWithIds
        ? __spreadArray([
            { type: tagType, id: 'LIST' }
        ], resultsWithIds.map(function (r) { return ({ type: tagType, id: r[idKey] }); }), true) : [{ type: tagType, id: 'LIST' }];
};
export var injectEndpoints = function (base, endpoints) {
    var _a;
    var evaluatedEndpoints = endpoints({
        query: function () { return null; },
        mutation: function () { return null; },
    });
    if (process.env.NODE_ENV !== 'production') {
        for (var _i = 0, _b = Object.entries(evaluatedEndpoints); _i < _b.length; _i++) {
            var endpointName = _b[_i][0];
            if (endpointName in base.endpoints) {
                throw new Error("Endpoint ".concat(endpointName, " already exists"));
            }
        }
    }
    return base.injectEndpoints({
        overrideExisting: ((_a = module.hot) === null || _a === void 0 ? void 0 : _a.status()) === 'apply',
        endpoints: endpoints,
    });
};
//# sourceMappingURL=util.js.map