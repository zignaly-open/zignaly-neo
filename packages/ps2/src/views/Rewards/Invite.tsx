import React from 'react';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import { ROUTE_SIGNUP } from '../../routes';
import useReferralCookie from '../../util/hooks/useReferralCookie';

const Invite: React.FC = () => {
  const { key } = useParams();
  useReferralCookie(key);
  return <Navigate replace to={generatePath(ROUTE_SIGNUP)} />;
};

export default Invite;
