import Cookies from 'js-cookie';
import { useEffect } from 'react';
var useReferralCookie = function (ref) {
    useEffect(function () {
        var params = new URLSearchParams(window.location.search);
        var inviteRef = params.get('invite');
        var subtrack = params.get('subtrack');
        if (ref || inviteRef) {
            Cookies.set('ref', ref || inviteRef);
            if (subtrack) {
                Cookies.set('subtrack', subtrack);
            }
        }
    }, [ref]);
};
export default useReferralCookie;
//# sourceMappingURL=useReferralCookie.js.map