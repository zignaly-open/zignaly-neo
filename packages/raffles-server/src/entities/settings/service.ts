import { Op } from 'sequelize';
import { ContextUser } from '../../types';
import { checkAdmin } from '../../util/admin';
import { Setting } from './model';

const blackList = ['last block'];

export const getSettings = async (user?: ContextUser) => {
  await checkAdmin(user?.id);

  return Setting.findAll({ where: { key: { [Op.notIn]: blackList } } });
};

export const updateSetting = async (
  user: ContextUser,
  data: Partial<Setting>,
) => {
  await checkAdmin(user?.id);

  const [, [setting]] = await Setting.update(data, {
    where: { key: data.key },
    returning: true,
  });
  if (!setting) throw new Error('Setting Not Found');

  return setting;
};
