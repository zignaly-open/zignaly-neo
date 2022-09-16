import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { setToken } from '../util/token';
import { Mumbai, Polygon, useEthers } from '@usedapp/core';
import { useAsync } from 'react-use';
import { useState } from 'react';
import {
  GET_CURRENT_USER,
  GET_OR_CREATE_USER,
  AUTHENTICATE_METAMASK,
  GET_CURRENT_USER_BALANCE,
} from 'queries/users';
import { GET_AUCTIONS } from 'queries/auctions';

export function useLogout(): () => Promise<void> {
  const { deactivate } = useEthers();
  const client = useApolloClient();
  return async () => {
    deactivate();
    setToken('');
    client.refetchQueries({
      include: [GET_AUCTIONS, GET_CURRENT_USER],
    });
  };
}

export default function useAuthenticate(): () => Promise<void> {
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_METAMASK);
  const [isOkToStart, setIsOkToStart] = useState(false);
  const client = useApolloClient();
  const { account, activateBrowserWallet, library, switchNetwork } =
    useEthers();

  async function createUserAndSign() {
    const {
      data: {
        getOrCreateUser: { messageToSign },
      },
    } = await getOrCreateUser({
      variables: { publicAddress: account.toLocaleLowerCase() },
    });

    await switchNetwork(
      process.env.REACT_APP_USE_MUMBAI_CHAIN ? Mumbai.chainId : Polygon.chainId,
    );

    const signature = await library.getSigner().signMessage(messageToSign);

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
    await client.refetchQueries({
      include: [GET_CURRENT_USER, GET_CURRENT_USER_BALANCE, GET_AUCTIONS],
    });
  }

  useAsync(async () => {
    if (!account || !isOkToStart) return;
    setIsOkToStart(false);
    createUserAndSign();
  }, [account, isOkToStart]);

  // TODO: error handling
  return async () => {
    // Ready to connect
    setIsOkToStart(true);

    if (!account) {
      // Init account
      await activateBrowserWallet();
    }
  };
}
