var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useZModal } from './use';
export var ZModalRouteElement = function (_a) {
    var bgRoute = _a.bgRoute, component = _a.component, ctaId = _a.ctaId, options = _a.options;
    var navigate = useNavigate();
    var params = useParams();
    var showModal = useZModal(__assign({ customClose: function (modal) {
            modal.destroy();
            navigate(generatePath(bgRoute, params));
        } }, (options || {}))).showModal;
    useEffect(function () {
        showModal(component, __assign({ ctaId: ctaId }, params));
    }, []);
    return null;
};
var createZModalRouteElement = function (_a) {
    var component = _a.component, ctaId = _a.ctaId, options = _a.options;
    return function (_a) {
        var bgRoute = _a.bgRoute;
        return (React.createElement(ZModalRouteElement, { bgRoute: bgRoute, component: component, options: options, ctaId: ctaId }));
    };
};
export default createZModalRouteElement;
//# sourceMappingURL=ZModalRoute.js.map