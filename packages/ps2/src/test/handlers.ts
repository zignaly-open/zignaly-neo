import { rest } from 'msw';
import {
  loginMockEmail,
  loginMockPassword,
  loginResponseMockSuccess,
  loginResponseMockWrongCredentials,
} from './mocks/login';
import { LoginPayload } from '../apis/user/types';
import {
  referrerDataResponseMockSuccess,
  referrerHistoryResponseMockSuccess,
  tierLevelsResponseMockSuccess,
} from './mocks/referrals';

const ps2 = [
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

const referrals = [
  rest.get(
    process.env.REACT_APP_REFERRALS_API + '/v1/referrer/data',
    async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(referrerDataResponseMockSuccess)),
  ),
  rest.get(
    process.env.REACT_APP_REFERRALS_API + '/v1/referrer/history',
    async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(referrerHistoryResponseMockSuccess)),
  ),
  rest.get(
    process.env.REACT_APP_REFERRALS_API + '/v1/tier-levels',
    async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(tierLevelsResponseMockSuccess)),
  ),
];

export const handlers = [...ps2, ...referrals];
