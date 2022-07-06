import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { setToken } from '../util/token';
import { useEthers,  } from '@usedapp/core';
import { useAsync } from 'react-use';
import { useContext, useState } from 'react';
import { onboardingContext } from '../contexts/Onboarding';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
      onboardingCompletedAt
    }
  }
`;

export const GET_OR_CREATE_USER = gql`
  mutation getOrCreateUser($publicAddress: String!) {
    getOrCreateUser(publicAddress: $publicAddress) {
      id
      onboardingCompletedAt
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
  const { deactivate } = useEthers();
  return async () => {
    deactivate();
    setToken('');
    await fetchUser();
  };
}
// TODO: Implement with backend. As Alex how it works.
export function useWalletConnect(): () => Promise<void> {
  const { activate, account } = useEthers();
  const [isOkToStart, setIsOkToStart] = useState(false);

  const provider = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
  });

  useAsync(async () => {
    if (!account || !isOkToStart) return;
    setIsOkToStart(false);
    activate(provider);
  }, [account, isOkToStart]);

  return async () => {
    setIsOkToStart(true);
    !account && (await provider.enable());
  };
}

export default function useAuthenticate(): () => Promise<void> {
  const { startOnboarding } = useContext(onboardingContext);
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_METAMASK);
  const [isOkToStart, setIsOkToStart] = useState(false);
  const fetchUser = useRefetchCurrentUser();
  const { account, activateBrowserWallet, library } = useEthers();

  useAsync(async () => {
    if (!account || !isOkToStart) return;
    setIsOkToStart(false);
    const {
      data: {
        getOrCreateUser: { messageToSign, onboardingCompletedAt },
      },
    } = await getOrCreateUser({
      variables: { publicAddress: account.toLocaleLowerCase() },
    });

    const signature = await library.getSigner().signMessage(messageToSign);
    const {
      data: {
        authenticate: { accessToken },
      },
    } = await authenticate({
      variables: { publicAddress: account.toLocaleLowerCase(), signature },
    });

    setToken(accessToken);
    await fetchUser();
    !onboardingCompletedAt && startOnboarding();
  }, [account, isOkToStart]);

  // TODO: error handling
  return async () => {
    setIsOkToStart(true);
    !account && activateBrowserWallet();
  };
}
