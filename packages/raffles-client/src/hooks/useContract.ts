import { useContractFunction } from '@usedapp/core';
import contract from 'contract';
import { parseEther } from 'ethers/lib/utils';

export default function useContract({ address }: { address: string }) {
  const { state, send } = useContractFunction(contract, 'transfer');

  const isLoading = ['PendingSignature', 'Mining'].includes(state?.status);

  const isError = ['Fail', 'Exception'].includes(state?.status);

  const isSuccess = ['Success'].includes(state?.status);

  const transfer = (transferAmount: string) =>
    send(address, parseEther(transferAmount));

  return {
    isSuccess,
    isError,
    transfer,
    isLoading,
  };
}
