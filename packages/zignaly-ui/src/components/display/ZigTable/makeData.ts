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

const newInvestorData = () => {
  return {
    email: "tec**@zig**.com",
    userId: faker.random.alphaNumeric(23),
    investment: faker.datatype.float({ max: 1000, precision: 0.01 }),
    coin: "USDT",
    pnl: faker.datatype.float({ max: 100, precision: 0.01 }),
    pnlTotal: faker.datatype.float({ max: 1000, precision: 0.01 }),
    totalFeesPaid: faker.datatype.float({ max: 50, precision: 0.01 }),
    successFee: faker.datatype.number(10),
    feesInZig: faker.datatype.boolean(),
    status: "connected",
  };
};

export function makeInvestorsData(len: number) {
  return Array(len).fill(null).map(newInvestorData);
}

const newExchangeOrderData = () => {
  const types = ["Limit", "Market"];
  return {
    date: faker.date.past(),
    orderId: faker.random.numeric(12),
    pair: "XML/USDT",
    amount: faker.datatype.float({ max: 50, precision: 0.01 }),
    status: "Open",
    entryPrice: faker.datatype.float({ max: 100, precision: 0.01 }),
    side: "Buy",
    type: faker.helpers.arrayElement(types),
  };
};

export function makeExchangeOrdersData(len: number) {
  return Array(len).fill(null).map(newExchangeOrderData);
}
