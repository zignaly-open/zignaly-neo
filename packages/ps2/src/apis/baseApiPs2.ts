import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'apis/baseQuery';

const baseApiPs2 = createApi({
  reducerPath: 'ps2Api',
  baseQuery: baseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    'ServiceApiKey',
    'ServiceInvestors',
    'Service',
    'ServiceChart',
    'Marketplace',
    'Investment',
    'Balance',
  ],
});

export default baseApiPs2;
