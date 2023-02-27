import React from 'react';
import { generatePath, Navigate, useParams } from 'react-router-dom';
import { ROUTE_SIGNUP } from '../../routes';

const Invite: React.FC = () => {
  const { key } = useParams();
  return (
    <Navigate replace to={generatePath(ROUTE_SIGNUP) + '?invite=' + key} />
  );
};

export default Invite;
