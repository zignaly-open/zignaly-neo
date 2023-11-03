import { rest } from 'msw';
import {
  loginMockEmail,
  loginMockPassword,
  loginResponseMockSuccess,
  loginResponseMockWrongCredentials,
} from './mocks/login';
import { LoginPayload } from '../apis/user/types';

export const handlers = [
  rest.post<LoginPayload>(
    process.env.REACT_APP_BASE_API + '/login',
    async (req, res, ctx) => {
      const { email, password } = (await req.json()) as LoginPayload;
      if (email === loginMockEmail && password === loginMockPassword) {
        return res(ctx.status(200), ctx.json(loginResponseMockSuccess));
      } else {
        return res(
          ctx.status(401),
          ctx.json(loginResponseMockWrongCredentials),
        );
      }
    },
  ),
];