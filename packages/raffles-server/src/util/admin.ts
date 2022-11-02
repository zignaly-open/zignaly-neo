import { AuthenticationError } from 'apollo-server-core';
import { ContextUser } from '../types';

export const checkAdmin = (user: ContextUser, callback?: () => void) => {
  if (!user?.isAdmin) throw new AuthenticationError('Not authorized');

  return callback ? callback() : true;
};
