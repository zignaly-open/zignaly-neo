import Button from "components/inputs/Button";
import React from "react";
import CoinLabel from "./components/CoinLabel";
import PriceLabel from "./components/PriceLabel";
import { Actions } from "./styles";

export const MockMyCoinsData = [
  {
    coin: <CoinLabel coin={"ETH"} name={"Ethereum"} />,
    totalBalance: <PriceLabel coin={"ETH"} value={"3.200"} />,
    availableBalance: <PriceLabel coin={"ETHAS"} value={"2.13521254"} />,
    lockedBalance: <PriceLabel coin={"ETHA"} value={"30.18389589"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"0.78232496"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"3.200"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
    totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
    availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
    lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
    valueInUsd: <PriceLabel coin={"USD"} value={"54000"} stableCoinOperative />,
    action: (
      <Actions>
        <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
        <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
      </Actions>
    ),
  },
  {
    coin: <CoinLabel coin={"BNB"} name={"Bianance Coin"} />,
    totalBalance: <PriceLabel coin={"BNB"} value={"190"} />,
    availableBalance: <PriceLabel coin={"BNB"} value={"5.1352"} />,
    lockedBalance: <PriceLabel coin={"BNB"} value={"1220"} />,
    valueInBtc: <PriceLabel coin={"BTC"} value={"21.782324"} />,
    valueInUsd: <PriceLabel symbol={"€"} coin={"EUR"} value={"400.50"} stableCoinOperative />,
    action: (
      <Actions>
        <Button
          caption={"Deposit"}
          color="grey"
          variant={"secondary"}
          size={"small"}
          onClick={() => {}}
        />
        <Button
          caption={"Withdraw"}
          color="grey"
          variant={"secondary"}
          size={"small"}
          onClick={() => {}}
        />
      </Actions>
    ),
  },
];
