import { INTEGER, STRING } from 'sequelize';
import { generateUserNonce } from './model';

export const fieldMapping = {
  nonce: {
    allowNull: false,
    type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
    defaultValue: generateUserNonce,
  },
  publicAddress: {
    allowNull: false,
    type: STRING,
    unique: true,
    validate: { isLowercase: true },
  },
  username: {
    type: STRING,
    unique: true,
  },
};
