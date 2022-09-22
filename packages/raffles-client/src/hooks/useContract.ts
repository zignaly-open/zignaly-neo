import { useContractFunction, useGasPrice } from '@usedapp/core';
import contract from 'contract';
import { parseEther } from 'ethers/lib/utils';

export default function useContract({ address }: { address: string }) {
  const { state, send } = useContractFunction(contract, 'transfer');

  const isLoading = ['PendingSignature', 'Mining'].includes(state?.status);

  const isError = ['Fail', 'Exception'].includes(state?.status);

  const isSuccess = ['Success'].includes(state?.status);
  const gasPrice = useGasPrice();

  const transfer = (transferAmount: string) => {
    return send(address, parseEther(transferAmount), {
      // Need gasPrice to avoid mobile issue: https://github.com/MetaMask/metamask-mobile/issues/3999
      gasPrice,
    });
  };

  return {
    isSuccess,
    isError,
    transfer,
    isLoading,
  };
}
