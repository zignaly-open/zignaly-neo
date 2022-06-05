import Web3 from 'web3';

export async function getWeb3(): Promise<Web3> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;
  if (!ethereum) {
    // TODO: nice message
    throw new Error('Please install metamask');
  }
  try {
    await ethereum.enable();
    return new Web3(ethereum);
  } catch (e) {
    // TODO: nice message
    throw new Error(
      'The site can not work without a permission to see your web3 address',
    );
  }
}
