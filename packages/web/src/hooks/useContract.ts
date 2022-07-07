import { useContractFunction } from '@usedapp/core';
import { useCallback, useMemo } from 'react';
import contract from 'contract';
import { parseEther } from 'ethers/lib/utils';

export default function useContract({
  transferAmount,
  address,
}: {
  transferAmount: string;
  address: string;
}) {
  const { state, send } = useContractFunction(contract, 'transfer');

  const isLoading = useMemo(
    () => ['PendingSignature', 'Mining'].includes(state?.status),
    [state.status],
  );

  const isError = useMemo(
    () => ['Fail', 'Exception'].includes(state?.status),
    [state.status],
  );

  const isSuccess = useMemo(
    () => ['Success'].includes(state?.status),
    [state.status],
  );

  const transfer = useCallback(
    () =>
      ['Success'].includes(state?.status)
        ? () => {}
        : send(address, parseEther(transferAmount)),
    [send, transferAmount],
  );

  return {
    isSuccess,
    isError,
    transfer,
    isLoading,
  };
}
