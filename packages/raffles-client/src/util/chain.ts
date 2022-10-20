import { ReactComponent as ETHIcon } from 'assets/icons/chains/eth.svg';
import { ReactComponent as BSCIcon } from 'assets/icons/chains/bnb.svg';
import { ReactComponent as MATICIcon } from 'assets/icons/chains/matic.svg';
import { ReactComponent as SOLIcon } from 'assets/icons/chains/sol.svg';
import { ReactComponent as AVAXIcon } from 'assets/icons/chains/avax.svg';
import { ReactComponent as APTOSIcon } from 'assets/icons/chains/aptos.svg';

export const chains: { [key: string]: { name: string; icon: typeof ETHIcon } } =
  {
    ETH: { name: 'Ethereum', icon: ETHIcon },
    BSC: { name: 'Binance Smart Chain', icon: BSCIcon },
    MATIC: { name: 'Polygon', icon: MATICIcon },
    SOL: { name: 'Solana', icon: SOLIcon },
    AVAX: { name: 'Avalanche', icon: AVAXIcon },
    APTOS: { name: 'Aptos', icon: APTOSIcon },
  };
