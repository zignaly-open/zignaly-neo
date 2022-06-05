import os from 'os';
import path from 'path';
import { Sequelize } from 'sequelize';

import { UserFieldMapping, User } from './models';

const sequelize = new Sequelize('zigraffle', '', undefined, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false,
});

User.init(UserFieldMapping, {
  modelName: 'user',
  sequelize,
  timestamps: false,
});

// persist models to the database
sequelize.sync();

export { sequelize };
