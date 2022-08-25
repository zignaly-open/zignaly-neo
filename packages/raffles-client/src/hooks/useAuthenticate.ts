import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { setToken } from '../util/token';
import { Mumbai, Polygon, useEthers } from '@usedapp/core';
import { useAsync } from 'react-use';
import { useState } from 'react';
import {
  GET_CURRENT_USER,
  GET_OR_CREATE_USER,
  AUTHENTICATE_METAMASK,
} from 'queries/users';
import { GET_AUCTIONS } from 'queries/auctions';

function useRefetchCurrentUser(): () => Promise<unknown> {
  const [fetchUser] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  return fetchUser;
}

export function useLogout(): () => Promise<void> {
  const fetchUser = useRefetchCurrentUser();
  const { deactivate } = useEthers();
  const client = useApolloClient();
  return async () => {
    deactivate();
    setToken('');
    await Promise.all([
      fetchUser(),
      client.refetchQueries({
        include: [GET_AUCTIONS],
      }),
    ]);
  };
}

export default function useAuthenticate(): () => Promise<void> {
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_METAMASK);
  const [isOkToStart, setIsOkToStart] = useState(false);
  const client = useApolloClient();
  const {
    account,
    activateBrowserWallet,
    library,
    switchNetwork,
    chainId,
    deactivate,
  } = useEthers();

  useAsync(async () => {
    if (!account || !isOkToStart) return;
    setIsOkToStart(false);

    const {
      data: {
        getOrCreateUser: { messageToSign },
      },
    } = await getOrCreateUser({
      variables: { publicAddress: account.toLocaleLowerCase() },
    });

    const signature = await library.getSigner().signMessage(messageToSign);
    if (!chainId) {
      await switchNetwork(
        process.env.REACT_APP_USE_MUMBAI_CHAIN
          ? Mumbai.chainId
          : Polygon.chainId,
      );
    }
    if (chainId) {
      const {
        data: {
          authenticate: { accessToken },
        },
      } = await authenticate({
        variables: {
          publicAddress: account.toLocaleLowerCase(),
          signature,
        },
      });
      setToken(accessToken);
    } else {
      deactivate();
    }
    await client.refetchQueries({
      include: [GET_CURRENT_USER, GET_AUCTIONS],
    });
  }, [account, isOkToStart, chainId]);

  // TODO: error handling
  return async () => {
    setIsOkToStart(true);
    !account && activateBrowserWallet();
  };
}
