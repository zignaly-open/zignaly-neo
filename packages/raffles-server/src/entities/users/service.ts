import { ContextUser, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { User } from './model';

export const getUsers = (
  user?: ContextUser,
  sortField = 'id',
  sortOrder = 'desc',
  page = 0,
  perPage = 25,
  filter: ResourceOptions['filter'] = {},
) => {
  checkAdmin(user?.id);

  return User.findAll({
    where: filter,
    order: [[sortField, sortOrder]],
    limit: perPage,
    offset: page * perPage,
  });
};

export const countUsers = async (filter: ResourceOptions['filter'] = {}) => {
  const count = await User.count({
    where: filter,
  });
  return { count };
};
