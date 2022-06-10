import Web3 from 'web3';
import {
  abi,
  contractAddress,
  numberOfConfirmationsRequired,
  receivingAddress,
  rpcSocketUrl,
  rpcUrl,
} from '../../config';
import { AbiItem } from 'web3-utils';
import { getLastProcessedBlock, setLastProcessedBlock } from './lastBlock';

const web3socket = new Web3(new Web3.providers.WebsocketProvider(rpcSocketUrl));
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
const zigCoinContract = new web3.eth.Contract(
  abi as unknown as AbiItem,
  contractAddress,
);

type ChainEvent = {
  blockNumber: number;
  transactionHash: string;
  returnValues: { from: string; to: string; value: string };
};

function watchTokenTransfers() {
  return web3socket.eth.subscribe('newBlockHeaders').on('data', (block) =>
    // TODO: check arithmetics here, maybe need +1
    checkBlock(block.number - numberOfConfirmationsRequired),
  );
}

async function checkBlock(blockNumber: number) {
  return checkBlocks(blockNumber, blockNumber);
}

async function checkBlocks(from: number, to?: number) {
  if (to && from > to) return;
  const lastBlockToCheck =
    (await web3.eth.getBlockNumber()) - numberOfConfirmationsRequired;
  to = Math.min(lastBlockToCheck, to || Number.MAX_SAFE_INTEGER);
  if (from > to) return;

  const transferEvents = await zigCoinContract.getPastEvents('Transfer', {
    fromBlock: from,
    toBlock: to,
    filter: {
      to: receivingAddress,
    },
  });

  for (let index = 0; index < transferEvents.length; index++) {
    await handleEventTransfer(transferEvents[index] as unknown as ChainEvent);
  }

  setLastProcessedBlock(to);
}

// Called to process each event
const handleEventTransfer = async (event: ChainEvent) => {
  // Get the event parameters
  const { from, to, value } = event.returnValues;
  console.error(
    `${from} sent to ${to}: ${web3.utils.fromWei(
      value,
      'ether',
    )} tokens at block: ${event.blockNumber} in transaction hash: ${
      event.transactionHash
    }`,
  );

  // TODO. implement shit
};

export default async function watchTransactions() {
  watchTokenTransfers();
  checkBlocks(await getLastProcessedBlock());
}
