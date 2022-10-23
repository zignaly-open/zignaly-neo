import { ContextUser, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { User } from './model';

export const getUsers = async (
  user?: ContextUser,
  sortField = 'id',
  sortOrder = 'desc',
  page = 0,
  perPage = 25,
  filter: ResourceOptions['filter'] = {},
) => {
  await checkAdmin(user?.id);

  return User.findAll({
    where: filter,
    order: [[sortField, sortOrder]],
    limit: perPage,
    offset: page * perPage,
  });
};

export const countUsers = async (
  user?: ContextUser,
  filter: ResourceOptions['filter'] = {},
) => {
  await checkAdmin(user?.id);

  const count = await User.count({
    where: filter,
  });
  return { count };
};
