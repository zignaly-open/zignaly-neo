import { rest } from 'msw';
import {
  loginMockEmail,
  loginMockPassword,
  loginResponseMockSuccess,
  loginResponseMockWrongCredentials,
} from './mocks/login';
import { LoginPayload } from '../apis/user/types';
import {
  referralRewardsResponseMockSuccess,
  referralTierLevelsResponseMockSuccess,
} from './mocks/referral';

const ps2Handlers = [
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

const referralsHandlers = [
  rest.get(
    process.env.REACT_APP_REFERRALS_API + '/v1/referrer/data',
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(referralRewardsResponseMockSuccess));
    },
  ),
  rest.get(
    process.env.REACT_APP_REFERRALS_API + '/v1/tier-levels',
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(referralTierLevelsResponseMockSuccess),
      );
    },
  ),
];

export const handlers = [...ps2Handlers, ...referralsHandlers];
