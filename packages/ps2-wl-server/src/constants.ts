import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();

const { BASE_API: initialValueBaseApi, WL_CACHE_TTL_OVERRIDE } = process.env;

export const BASE_API =
  initialValueBaseApi &&
  initialValueBaseApi + (initialValueBaseApi.endsWith('/') ? '' : '/');

export const CACHE_TTL = WL_CACHE_TTL_OVERRIDE || 10 * 60_000;

export const BUILD_PATH = path.join(fs.realpathSync('.'), 'build');

export const { PS2_ENV, SLACK_WEBHOOK } = process.env;

export const INDEX_HTML = fs.readFileSync(
  path.join(BUILD_PATH, 'index.html'),
  'utf8',
);
