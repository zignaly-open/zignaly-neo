import { LogEntry, LogFilterType } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints, PaginatedResponse, PaginationType } from 'apis/util';
import { fixSearchParams } from '@zignaly-open/ui';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  logs: builder.query<
    PaginatedResponse<LogEntry>,
    LogFilterType & PaginationType
  >({
    query: (params) => ({
      url: 'logs',
      method: 'GET',
      params: fixSearchParams(params),
    }),
  }),
}));

export const { useLogsQuery } = api;
