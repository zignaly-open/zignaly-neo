import Web3 from 'web3';
import {
  abi,
  contractAddress,
  numberOfConfirmationsRequired,
  receivingAddress,
  rpcSocketUrl,
  rpcUrl,
  zignalySystemId,
} from '../../config';
import { AbiItem } from 'web3-utils';
import { getLastProcessedBlock, setLastProcessedBlock } from './lastBlock';
import { User } from '../entities/users/model';
import {
  // TODO: here's the problem and we cant run the watch script separately from the main app
  emitBalanceChanged,
} from '../entities/users/util';
import { internalTransfer } from '../cybavo';
import { TransactionType } from '../types';

type ChainEvent = {
  blockNumber: number;
  transactionHash: string;
  returnValues: { from: string; to: string; value: string };
};

export default async function watchTransactions() {
  const options = {
    timeout: 30000, // ms

    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: -1, // ms
    },
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false,
    },
  };

  const web3socket = new Web3(
    new Web3.providers.WebsocketProvider(rpcSocketUrl, options),
  );
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  const zigCoinContract = new web3.eth.Contract(
    abi as unknown as AbiItem,
    contractAddress,
  );

  function watchTokenTransfers() {
    return web3socket.eth
      .subscribe('newBlockHeaders')
      .on('data', (block) => {
        // TODO: check arithmetics here, maybe need +1
        checkBlock(block.number - numberOfConfirmationsRequired);
      })
      .on('error', (err) => {
        throw err;
      });
  }

  async function checkBlock(blockNumber: number) {
    checkBlocks(blockNumber, blockNumber);
  }

  async function checkBlocks(from: number, to?: number) {
    try {
      if (!from || (to && from > to)) return;
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
        await handleEventTransfer(
          transferEvents[index] as unknown as ChainEvent,
        );
      }
      setLastProcessedBlock(to);
    } catch (e) {
      console.error(e);
    }
  }

  // Called to process each event
  const handleEventTransfer = async (event: ChainEvent) => {
    // Get the event parameters
    const { from, to, value } = event.returnValues;

    try {
      console.log(
        `${from} sent to ${to}: ${web3.utils.fromWei(
          value,
          'ether',
        )} tokens at block: ${event.blockNumber} in transaction hash: ${
          event.transactionHash
        }`,
      );

      await internalTransfer(
        zignalySystemId,
        from.toLowerCase(),
        web3.utils.fromWei(value, 'ether'),
        TransactionType.Deposit,
        false,
      );

      const user = await User.findOne({
        where: { publicAddress: from.toLowerCase() },
        raw: true,
      });
      if (!user) return;

      await emitBalanceChanged(user);
    } catch (e) {
      console.error(e);
    }
  };

  watchTokenTransfers();
  checkBlocks(await getLastProcessedBlock());
}
