import { User } from '../entities/users/model';

export const checkAdmin = async (id: number) => {
  const fullUser = await User.findByPk(id);
  if (!fullUser?.isAdmin) throw new Error('Not authorized');
  return true;
};
