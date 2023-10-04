import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.fetch = fetch;
export const server = setupServer(...handlers);
