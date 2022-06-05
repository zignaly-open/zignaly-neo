import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { getWeb3 } from '../util/web3';
import { setToken } from '../util/token';

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
    }
  }
`;

export const GET_OR_CREATE_USER = gql`
  mutation getOrCreateUser($publicAddress: String!) {
    getOrCreateUser(publicAddress: $publicAddress) {
      id
      messageToSign
    }
  }
`;

export const AUTHENTICATE_METAMASK = gql`
  mutation getOrCreateUser($publicAddress: String!, $signature: String!) {
    authenticate(publicAddress: $publicAddress, signature: $signature) {
      accessToken
    }
  }
`;

function useRefetchCurrentUser(): () => Promise<unknown> {
  const [fetchUser] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });
  return fetchUser;
}

export function useLogout(): () => Promise<void> {
  const fetchUser = useRefetchCurrentUser();
  return async () => {
    setToken('');
    await fetchUser();
  };
}

export default function useAuthenticate(): () => Promise<void> {
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_METAMASK);
  const fetchUser = useRefetchCurrentUser();

  return async () => {
    try {
      const web3 = await getWeb3();
      const publicAddress = (await web3.eth.getCoinbase()).toLowerCase();
      if (publicAddress) {
        const {
          data: {
            getOrCreateUser: { messageToSign },
          },
        } = await getOrCreateUser({
          variables: { publicAddress },
        });

        const signature = await web3!.eth.personal.sign(
          messageToSign,
          publicAddress,
          '', // MetaMask will ignore the password argument here
        );

        const {
          data: {
            authenticate: { accessToken },
          },
        } = await authenticate({
          variables: { publicAddress, signature },
        });

        setToken(accessToken);
        await fetchUser();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      // TODO: good notifications
      alert('In order to use the app you need to authenticate with Metamask');
    }
  };
}
