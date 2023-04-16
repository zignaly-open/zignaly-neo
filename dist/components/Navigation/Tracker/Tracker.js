import { useEffect } from 'react';
import { useCurrentUser } from '../../../apis/user/use';
import { track, trackCta } from '@zignaly-open/tracker';
import { useLocation } from 'react-router-dom';
import { trackPage } from 'util/analytics';
var Tracker = function () {
    var userId = useCurrentUser().userId;
    var location = useLocation();
    useEffect(function () {
        var clickListener = function (e) {
            var node = e.target;
            if (['a', 'button'].includes(node === null || node === void 0 ? void 0 : node.tagName.toLocaleLowerCase())) {
                var ctaId = node.getAttribute('data-track-cta') || node.getAttribute('id');
                ctaId &&
                    trackCta({
                        userId: userId,
                        ctaId: ctaId,
                    });
            }
        };
        document.addEventListener('click', clickListener);
        return function () { return document.removeEventListener('click', clickListener); };
    }, [userId]);
    useEffect(function () {
        track({ userId: userId });
        trackPage();
    }, [location.pathname, userId]);
    return null;
};
export default Tracker;
//# sourceMappingURL=Tracker.js.map