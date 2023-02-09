import { Interface } from 'ethers/lib/utils';
import { Contract } from '@ethersproject/contracts';
import { IERC20 } from '@zignaly-open/raffles-shared/abis';

const wethInterface = new Interface(IERC20);
const wethContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contract = new Contract(wethContractAddress, wethInterface);

export default contract;
