// TODO: should be fixed with RTK update
// https://github.com/reduxjs/redux-toolkit/issues/2485
// @ts-ignore
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
    'Assets',
  ],
});

export default baseApiPs2;
