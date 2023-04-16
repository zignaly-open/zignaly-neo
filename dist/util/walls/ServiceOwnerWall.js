import React from 'react';
import { generatePath, Navigate, Outlet, useParams } from 'react-router-dom';
import { useIsServiceOwner } from '../../apis/service/use';
import { ROUTE_TRADING_SERVICE } from '../../routes';
var ServiceOwnerWall = function () {
    var serviceId = useParams().serviceId;
    var isOwner = useIsServiceOwner(serviceId);
    return isOwner === false ? (React.createElement(Navigate, { to: generatePath(ROUTE_TRADING_SERVICE, {
            serviceId: serviceId,
        }), replace: true })) : (React.createElement(Outlet, null));
};
export default ServiceOwnerWall;
//# sourceMappingURL=ServiceOwnerWall.js.map