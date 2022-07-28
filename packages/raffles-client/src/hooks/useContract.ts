import { useContractFunction } from '@usedapp/core';
import { useCallback } from 'react';
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

  const isLoading = ['PendingSignature', 'Mining'].includes(state?.status);

  const isError = ['Fail', 'Exception'].includes(state?.status);

  const isSuccess = ['Success'].includes(state?.status);

  const transfer = useCallback(
    () =>
      ['Success'].includes(state?.status)
        ? () => {}
        : send(address, parseEther(transferAmount)),
    [state?.status, address],
  );

  return {
    isSuccess,
    isError,
    transfer,
    isLoading,
  };
}
