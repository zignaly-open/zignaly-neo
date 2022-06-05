import os from 'os';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/model';

const sequelize = new Sequelize('zigraffle', '', undefined, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false,
  models: [User],
});

// persist models to the database
sequelize.sync();

export { sequelize };
