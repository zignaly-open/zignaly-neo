import { UserData, UserState } from 'apis/user/types';

export const userDataResponseMock = {
  userId: '4f886d29da8e9666b1684c9a',
  firstName: 'Test',
  email: 'test@test.com',
  locale: 'en',
  createdAt: '2021-10-15T15:39:21+00:00',
  // wall: [],
  exchanges: [
    {
      createdAt: '2020-10-15T15:39:21+00:00',
      exchangeId: '5e662c1c3e3b24c186ed9c25',
      exchangeName: 'Zignaly',
      internalId: 'Zignaly1602776532_5f886dd39a4c4',
      internalName: 'Futures Zignaly',
      areKeysValid: true,
      exchangeType: 'futures',
      disable: false,
      checkAuthCount: false,
      isBrokerAccount: true,
      activated: true,
    },
    {
      createdAt: '2020-12-03T09:00:53+00:00',
      exchangeId: '5e662c1c3e3b24c186ed9d24',
      exchangeName: 'Zignaly',
      internalId: 'Zignaly1606986053_5fc8a94509df0',
      internalName: 'Profit Sharing Spot',
      areKeysValid: true,
      exchangeType: 'spot',
      disable: false,
      checkAuthCount: false,
      isBrokerAccount: true,
      activated: true,
    },
  ],
  '2FAEnable': false,
  token: '33token',
  // imageUrl: null,
  userName: 'string string',
  verified: false,
  refCode: '617de36fad30d',
  about: 'Lorem ipsum dollar',
  country: 'MX',
  accessLevel: 500,
  subscriptionPlan: {
    priceYear: 1497,
    priceLifetime: 3997,
    name: 'Subscription',
    successFeePct: 40,
    id: '64dc95250f375e86440f6808',
  },
  ask2FA: false,
  isAdmin: false,
  isSupport: false,
  KYCMonitoring: true,
  subscriptionFinishesAt: '2024-08-18T17:05:44+00:00',
  subscriptionDuration: 'year',
  isTrader: {
    profit_sharing: true,
  },
  intercomHash:
    '864ce1b1866f0160cce7d84aae35a4869d4d749ed14b6fc4dcb95d4d522cf9fc',
} as UserData;

export const userStateMock = {
  accessToken: '33token',
  sessionExpiryDate: new Date('2023-09-25T07:54:15.000Z'),
  user: userDataResponseMock,
  activeExchangeInternalId: 'Zignaly1602776532_5f886dd39a4c4',
} as UserState;
