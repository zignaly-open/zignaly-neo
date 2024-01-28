import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();

const { BASE_API: initialValueBaseApi } = process.env;

if (!initialValueBaseApi) {
  console.error('`BASE_API` should be defined');
  process.exit(1);
}

export const BASE_API =
  initialValueBaseApi + (initialValueBaseApi.endsWith('/') ? '' : '/');
export const CACHE_TTL = 10 * 60_000;
export const BUILD_PATH = path.join(fs.realpathSync('.'), 'build');

export const { PS2_ENV } = process.env;
