import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'apis/baseQuery';

const baseApiBackoffice = createApi({
  reducerPath: 'backofficeApi',
  baseQuery: baseQuery(),
  endpoints: () => ({}),
});

export default baseApiBackoffice;
