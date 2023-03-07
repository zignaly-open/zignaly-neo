import React, { useEffect } from 'react';
import { useCurrentUser } from '../../../apis/user/use';
import { track, trackCta } from '@zignaly-open/tracker';
import { useLocation } from 'react-router-dom';
import { trackPage } from 'util/analytics';

const Tracker: React.FC = () => {
  const { userId } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      const node = e.target as HTMLElement;
      if (['a', 'button'].includes(node?.tagName.toLocaleLowerCase())) {
        const ctaId =
          node.getAttribute('data-track-cta') || node.getAttribute('id');
        ctaId &&
          trackCta({
            userId,
            ctaId,
          });
      }
    };
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  }, [userId]);

  useEffect(() => {
    track({ userId });
    trackPage();
  }, [location.pathname, userId]);

  return null;
};

export default Tracker;
