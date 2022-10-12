import { useQuery } from '@apollo/client';
import { UserType } from '@zignaly-open/raffles-shared/types';
import { GraphQLError } from 'graphql';
import { GetCurrentUserResponseModel } from 'queries/auctions';
import useCurrentUser, { CurrentUserModel } from './useCurrentUser';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('@usedapp/core', () => ({
  useEthers: () => ({ account: '0xabc' }),
}));

describe('useCurrentUser', () => {
  const user: UserType = {
    id: 1,
    nonce: 1,
    publicAddress: '',
    username: '',
    email: '',
    discordName: '',
    onBoardingCompleted: new Date(Date.now()),
  };

  const mockResponse: GetCurrentUserResponseModel = {
    loading: false,
    data: { me: user },
  };

  const undefinedMockResponse: GetCurrentUserResponseModel = {
    loading: false,
    data: undefined,
  };

  const currentUserReturnValue: CurrentUserModel = {
    user: mockResponse.data.me,
    loading: mockResponse.loading,
  };

  describe('returns', () => {
    it('user and loading', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(mockResponse);
      expect(useCurrentUser()).toEqual(currentUserReturnValue);
    });

    it('undefined data when user is null', () => {
      (useQuery as jest.Mock).mockReturnValueOnce(undefinedMockResponse);
      expect(useCurrentUser()).toEqual({
        loading: undefinedMockResponse.loading,
        data: undefined,
      });
    });
  });

  describe('throws', () => {
    it('GraphQL error', () => {
      (useQuery as jest.Mock).mockImplementation(() => {
        throw new GraphQLError('Error');
      });
      expect(() => useCurrentUser()).toThrow(new GraphQLError('Error'));
    });
  });
});
