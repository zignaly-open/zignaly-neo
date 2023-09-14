import { LogEntry, LogFilterType } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { fixSearchParams, injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  logs: builder.query<LogEntry[], LogFilterType>({
    query: (params) => ({
      url: 'logs',
      method: 'GET',
      params: fixSearchParams(params),
    }),
  }),
}));

export const { useLazyLogsQuery } = api;
