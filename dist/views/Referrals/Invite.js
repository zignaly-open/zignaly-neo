import React from 'react';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import { ROUTE_SIGNUP } from '../../routes';
import useReferralCookie from '../../util/hooks/useReferralCookie';
var Invite = function () {
    var key = useParams().key;
    useReferralCookie(key);
    return React.createElement(Navigate, { replace: true, to: generatePath(ROUTE_SIGNUP) });
};
export default Invite;
//# sourceMappingURL=Invite.js.map