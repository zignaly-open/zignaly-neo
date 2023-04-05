import { rest } from 'msw';
import { loginResponseMockWrongCredentials } from './mocks/login';
import { LoginResponse } from '../apis/user/types';

export const handlers = [
  rest.post(process.env.REACT_APP_BASE_API + '/login', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<LoginResponse>(loginResponseMockWrongCredentials),
    ),
  ),
];
