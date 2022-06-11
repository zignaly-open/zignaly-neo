import React from 'react';
import { useBalanceSubscription } from '../../hooks/useBalance';

const UserBalanceListener: React.FC = () => {
  useBalanceSubscription();
  return null;
};

export default UserBalanceListener;
