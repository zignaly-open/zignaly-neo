import { LogEntry } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  logs: builder.query<LogEntry[], void>({
    query: () => ({
      url: 'logs',
      method: 'GET',
    }),
  }),
}));

export const { useLogsQuery } = api;
