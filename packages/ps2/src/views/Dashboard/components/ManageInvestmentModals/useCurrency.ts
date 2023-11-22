import { useAsync } from 'react-use';

function useCurrency() {
  const { value: currency } = useAsync(async () => {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEOLOCATION_API_KEY}`,
    );
    const data = await response.json();
    return data.currency.code;
  }, []);

  return currency;
}

export default useCurrency;
