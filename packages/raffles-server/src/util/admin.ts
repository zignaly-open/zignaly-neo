import { AuthenticationError } from 'apollo-server-core';
import { User } from '../entities/users/model';

export const checkAdmin = async (id: number) => {
  const fullUser = await User.findByPk(id);
  if (!fullUser?.isAdmin) throw new AuthenticationError('Not authorized');

  return true;
};
