import { useApolloClient, useMutation } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { getConnection } from 'config/web3';
import {
  GET_AUCTIONS,
  AUTHENTICATE_METAMASK,
  GET_CURRENT_USER,
  GET_CURRENT_USER_BALANCE,
  GET_OR_CREATE_USER,
} from 'config/apollo/queries';
import { useCallback, useState } from 'react';
import { useAsync } from 'react-use';
import { useAppDispatch } from 'state/hooks';
import { updateSelectedWallet } from 'state/user/reducer';
import { setToken } from 'util/token';

export function useLogout(): () => Promise<void> {
  const dispatch = useAppDispatch();
  const { connector } = useWeb3React();

  const client = useApolloClient();
  return async () => {
    if (connector.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }

    dispatch(updateSelectedWallet({ wallet: undefined }));
    setToken('');
    client.refetchQueries({
      include: [GET_AUCTIONS],
    });
  };
}

export default function useAuthenticate(): {
  tryAuthentication: (_connector: Connector) => void;
  isSigning: boolean;
  error: Error & { code: number };
} {
  const dispatch = useAppDispatch();
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_METAMASK);
  const [isOkToStart, setIsOkToStart] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const client = useApolloClient();
  const { account, provider, connector } = useWeb3React();
  const [error, setError] = useState(null);

  const tryActivation = useCallback(
    async (_connector: Connector) => {
      const connectionType = getConnection(_connector).type;

      try {
        await _connector.activate();

        dispatch(updateSelectedWallet({ wallet: connectionType }));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.debug(`web3-react connection error: ${e}`);
        // dispatch(
        //   updateConnectionError({ connectionType, error: error.message }),
        // );
      }
    },
    [dispatch],
  );

  const handleSignMessage = useCallback(async () => {
    try {
      if (!account || !provider || !connector) return;
      setIsSigning(true);
      const connectionType = getConnection(connector).type;

      const {
        data: {
          getOrCreateUser: { messageToSign },
        },
      } = await getOrCreateUser({
        variables: {
          publicAddress: account.toLocaleLowerCase(),
          walletType: connectionType.toLocaleLowerCase(),
        },
      });
      const signer = provider.getSigner();
      const signature = await signer.signMessage(messageToSign);

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
        include: [GET_CURRENT_USER],
        updateCache(cache) {
          cache.evict({ fieldName: 'me' });
        },
      });

      client.refetchQueries({
        include: [GET_CURRENT_USER_BALANCE, GET_AUCTIONS],
        updateCache(cache) {
          cache.evict({ fieldName: 'balance' });
        },
      });
    } catch (e) {
      setError(e);
    } finally {
      setIsSigning(false);
    }
  }, [account, provider, connector]);

  useAsync(async () => {
    if (!provider || !connector || !account || !isOkToStart) return;
    await handleSignMessage();
    setIsOkToStart(false);
  }, [provider]);

  const startAuthenticate = useCallback(
    (_connector: Connector) => {
      setError(null);

      // In case there is an old token saved, that will trigger useCurrentUser fetching
      // as soon as account connected, but new message not signed yet.
      setToken('');

      // Ready to connect
      setIsOkToStart(true);

      if (!account || !provider) tryActivation(_connector);
    },
    [account, provider, tryActivation],
  );

  return {
    tryAuthentication: startAuthenticate,
    isSigning,
    error,
  };
}
