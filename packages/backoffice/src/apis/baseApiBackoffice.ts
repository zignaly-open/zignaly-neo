import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'apis/baseQuery';

const baseApiBackoffice = createApi({
  reducerPath: 'backofficeApi',
  baseQuery: baseQuery(),
  endpoints: () => ({}),
  tagTypes: ['WlConfig'],
});

export default baseApiBackoffice;
