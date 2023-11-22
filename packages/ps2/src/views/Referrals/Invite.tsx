import React from 'react';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import { ROUTE_SIGNUP } from '../../routes';
import useReferralCookie from '../../util/hooks/useReferralCookie';

const Invite: React.FC = () => {
  const { key } = useParams();
  const params = new URLSearchParams(window.location.search);
  const subtrack = params.get('subtrack');
  useReferralCookie(key.split('&')[0], subtrack);
  return <Navigate replace to={generatePath(ROUTE_SIGNUP)} />;
};

export default Invite;
