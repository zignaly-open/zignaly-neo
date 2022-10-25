import { Op } from 'sequelize';
import { ContextUser } from '../../types';
import { checkAdmin } from '../../util/admin';
import { Setting } from './model';

const blackList = ['last block'];

export const getSettings = async (user?: ContextUser) => {
  await checkAdmin(user?.id);

  const settings = await Setting.findAll({
    where: { key: { [Op.notIn]: blackList } },
  });
  return settings.reduce((acc, s) => {
    return { ...acc, [s.key]: s.value };
  }, {});
};

export const updateSettings = async (
  user: ContextUser,
  data: Partial<Setting>,
) => {
  await checkAdmin(user?.id);

  await Setting.bulkCreate(
    Object.keys(data)
      .filter((key) => !blackList.includes(key))
      .map((key) => ({
        key,
        value: data[key],
      })),
    {
      updateOnDuplicate: ['value'],
    },
  );

  return getSettings(user);
};
