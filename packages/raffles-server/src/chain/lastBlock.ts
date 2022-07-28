import { getConfigValue, setConfigValue } from '../entities/setting/util';
import { CONFIG_LAST_PROCESSED_BLOCK } from '../entities/setting/constants';

const lastProcessedBlockDefaultValue = 10988384;

export async function setLastProcessedBlock(
  blockNumber: number,
): Promise<void> {
  try {
    await setConfigValue(CONFIG_LAST_PROCESSED_BLOCK, `${blockNumber}`);
  } catch (e) {
    console.error(e);
  }
}

export async function getLastProcessedBlock(): Promise<number> {
  const lastBlock = await getConfigValue(
    CONFIG_LAST_PROCESSED_BLOCK,
    `${lastProcessedBlockDefaultValue}`,
  );
  return +lastBlock;
}
