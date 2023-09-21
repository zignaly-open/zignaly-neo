import { LogEntry, LogFilterType } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';
import { fixSearchParams } from '@zignaly-open/ui';

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
