import { useContractFunction } from '@usedapp/core';
import { useCallback, useMemo } from 'react';
import contract from 'contract';
import { parseEther } from 'ethers/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function useContract({
  transferAmount,
  address,
}: {
  transferAmount: string;
  address: string;
}) {
  const { state, send } = useContractFunction(contract, 'transfer');
  const navigate = useNavigate();

  const isLoading = useMemo(
    () => ['PendingSignature', 'Mining'].includes(state?.status),
    [state],
  );

  const isError = useMemo(
    () => ['Fail', 'Exception'].includes(state?.status),
    [state],
  );

  const isSuccess = useMemo(() => ['Success'].includes(state?.status), [state]);

  const transfer = useCallback(
    () =>
      ['Success'].includes(state?.status)
        ? () => navigate('/')
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
