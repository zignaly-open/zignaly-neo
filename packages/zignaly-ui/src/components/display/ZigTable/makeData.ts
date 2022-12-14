import { faker } from "@faker-js/faker";

const coins = [
  { coin: "BTC", name: "Bitcoin" },
  { coin: "ETH", name: "Ethereum" },
  { coin: "SOL", name: "Solana" },
  { coin: "USDT", name: "Tether" },
];

const newCoinData = () => {
  const coin = faker.helpers.arrayElement(coins);
  return {
    coin,
    totalBalance: {
      coin: coin.coin,
      value: faker.datatype.float({ max: 2, precision: 0.00000001 }),
    },
    availableBalance: {
      coin: coin.coin,
      value: faker.datatype.float({ max: 2, precision: 0.00000001 }),
    },
    lockedBalance: {
      coin: coin.coin,
      value: faker.datatype.float({ max: 2, precision: 0.00000001 }),
    },
    valueInBtc: {
      coin: "BTC",
      value: faker.datatype.float({ max: 2, precision: 0.00000001 }),
    },
    valueInUsd: {
      coin: "USD",
      value: faker.datatype.float({ max: 10000, precision: 0.01 }),
    },
  };
};

export function makeCoinsData(len: number) {
  return Array(len).fill(null).map(newCoinData);
}
