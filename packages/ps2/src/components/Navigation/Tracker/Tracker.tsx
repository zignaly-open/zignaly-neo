import React, { useEffect } from 'react';
import { useCurrentUser } from '../../../apis/user/use';
import { track } from '@zignaly-open/tracker';
import { useLocation } from 'react-router-dom';

const Tracker: React.FC = () => {
  const { userId } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    track({ userId });
  }, [location.pathname, userId]);

  return null;
};

export default Tracker;
