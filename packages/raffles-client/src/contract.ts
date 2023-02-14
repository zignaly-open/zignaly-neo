import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { IERC20 } from '@zignaly-open/raffles-shared/abis';

const wethInterface = new utils.Interface(IERC20);
const wethContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contract = new Contract(wethContractAddress, wethInterface);

export const ZIGCOIN_PRECISION = 18;

export default contract;
