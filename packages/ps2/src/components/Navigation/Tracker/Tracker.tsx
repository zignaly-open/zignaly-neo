import React, { useEffect } from 'react';
import { useCurrentUser } from '../../../apis/user/use';
import { track, trackClick } from '@zignaly-open/tracker';
import { useLocation } from 'react-router-dom';
import { trackPage } from 'util/analytics';

const Tracker: React.FC = () => {
  const { userId } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      let node = e.target as HTMLElement;
      // the target could be a child event of a button
      do {
        if (['a', 'button'].includes(node?.tagName.toLocaleLowerCase())) {
          const ctaId =
            node.getAttribute('data-track-cta') || node.getAttribute('id');
          const noAutoTrack = node.getAttribute('data-no-auto-track');
          ctaId &&
            !noAutoTrack &&
            trackClick({
              userId,
              ctaId,
            });
          break;
        } else {
          node = node.parentNode as HTMLElement;
        }
      } while (node);
    };
    document.addEventListener('mouseup', clickListener);
    return () => document.removeEventListener('mouseup', clickListener);
  }, [userId]);

  useEffect(() => {
    track({ userId });
    trackPage();
  }, [location.pathname, userId]);

  return null;
};

export default Tracker;
