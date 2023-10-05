import { HttpResponse, http } from 'msw';
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
import { userDataResponseMock } from './mocks/user';

const ps2 = [
  http.get(process.env.REACT_APP_BASE_API + '/user/session', () => {
    return HttpResponse.json({
      userId: 'aa',
      validUntil: '2024-08-18T17:05:44+00:00',
    });
  }),
  http.get(process.env.REACT_APP_BASE_API + '/user/data', () => {
    return HttpResponse.json(userDataResponseMock);
  }),
  http.post<LoginPayload>(
    process.env.REACT_APP_BASE_API + '/login',
    async ({ request }) => {
      const { email, password } = (await request.json()) as LoginPayload;
      if (email === loginMockEmail && password === loginMockPassword) {
        return HttpResponse.json(loginResponseMockSuccess);
      } else {
        return HttpResponse.json(loginResponseMockWrongCredentials, {
          status: 401,
        });
      }
    },
  ),
];

const referrals = [
  http.get(process.env.REACT_APP_REFERRALS_API + '/v1/referrer/data', () => {
    return HttpResponse.json(referrerDataResponseMockSuccess);
  }),
  http.get(process.env.REACT_APP_REFERRALS_API + '/v1/referrer/history', () => {
    return HttpResponse.json(referrerHistoryResponseMockSuccess);
  }),
  http.get(process.env.REACT_APP_REFERRALS_API + '/v1/tier-levels', () => {
    return HttpResponse.json(tierLevelsResponseMockSuccess);
  }),
  http.put(process.env.REACT_APP_REFERRALS_API + '/v1/referrer', () =>
    HttpResponse.text('', { status: 200 }),
  ),
];

export const handlers = [...ps2, ...referrals];
