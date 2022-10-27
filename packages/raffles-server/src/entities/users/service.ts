import { Op } from 'sequelize';
import { ContextUser, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { User } from './model';

const userFilter = (filter: ResourceOptions['filter'] = {}) => {
  const { q, ...restFilter } = filter;
  return {
    ...restFilter,
    ...(q && {
      [Op.or]: [
        { id: isNaN(parseInt(q.toString())) ? null : q },
        { username: { [Op.iLike]: `%${q}%` } },
        { discordName: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } },
      ],
    }),
  };
};

export const getUsers = async (
  user?: ContextUser,
  sortField = 'id',
  sortOrder = 'desc',
  page = 0,
  perPage = 25,
  filter?: ResourceOptions['filter'],
) => {
  await checkAdmin(user?.id);

  return User.findAll({
    where: userFilter(filter),
    order: [[sortField, sortOrder]],
    limit: perPage,
    offset: page * perPage,
  });
};

export const countUsers = async (
  user?: ContextUser,
  filter?: ResourceOptions['filter'],
) => {
  await checkAdmin(user?.id);

  const count = await User.count({
    where: userFilter(filter),
  });
  return { count };
};
