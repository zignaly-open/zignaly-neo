import Web3 from 'web3';

export async function getWeb3Address(): Promise<string> {
  const { ethereum } = window as any;
  if (!ethereum) {
    // TODO: nice message
    throw new Error('Please install metamask');
  }
  try {
    await ethereum.enable();
    const web3 = new Web3(ethereum);
    return (await web3.eth.getCoinbase()).toLowerCase();
  } catch (e) {
    // TODO: nice message
    throw new Error(
      'The site can not work without a permission to see your web3 address',
    );
  }
}
