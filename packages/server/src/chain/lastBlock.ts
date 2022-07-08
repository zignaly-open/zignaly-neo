// TODO: store last processed block. Maybe not in the env, I do not quite like changing env
let lastProcessedBlock = 10988242;

export async function setLastProcessedBlock(
  blockNumber: number,
): Promise<void> {
  lastProcessedBlock = blockNumber;
}

export async function getLastProcessedBlock(): Promise<number> {
  return lastProcessedBlock;
}
