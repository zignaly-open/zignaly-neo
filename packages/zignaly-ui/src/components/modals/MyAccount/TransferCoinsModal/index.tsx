import Typography from "components/display/Typography";
import Button from "components/inputs/Button";
import InputAmount from "components/inputs/InputAmount";
import Select from "components/inputs/Selector";
import { SelectSizes } from "components/inputs/Selector/types";
import TextButton from "components/inputs/TextButton";
import ModalContainer from "components/modals/ModalContainer";
import React, { useMemo, useState } from "react";
import { Gap } from "utils/gap";
import { Row } from "utils/row";
import { AccountOption } from "../types";
import { SelectorContainer } from "./styles";
import { CoinTransfer, TransferCoinsModalProps } from "./types";
import ListIcon from "assets/icons/list-icon.svg";

const TransferCoinsModal = ({
  onClickClose = () => {},
  avaliableCoins,
  accounts,
  historyOnClick = () => {},
  transferNowOnClick = () => {},
  isLoading = false,
}: TransferCoinsModalProps) => {
  const [transferCoin, setTransferCoin] = useState<CoinTransfer>();
  const [fromAccount, setFromAccount] = useState<AccountOption>();
  const [toAccount, setToAccount] = useState<AccountOption>();

  const filteredToAccounts = useMemo(
    () =>
      accounts.filter((account) => {
        return fromAccount?.index !== account.index;
      }),
    [accounts, fromAccount],
  );

  return (
    <ModalContainer title="Transfer Coins" onClickClose={onClickClose}>
      <Gap gap={20} />
      <Row gap={16}>
        <Typography variant="body1" color="neutral200">
          Transfer coins without fee from
        </Typography>
        <SelectorContainer>
          <Select
            value={fromAccount}
            maxHeight={36}
            placeholder={""}
            onChange={(account: AccountOption) => {
              setFromAccount(account);
            }}
            options={accounts}
            size={SelectSizes.SMALL}
          />
        </SelectorContainer>
      </Row>
      <Gap gap={14} />
      <InputAmount
        placeholder="Amount"
        label={"Amount To Transfer:"}
        value={transferCoin?.value ?? ""}
        onChange={(e: any, { value, token }: CoinTransfer) =>
          setTransferCoin({ token: token, value: value })
        }
        tokens={avaliableCoins}
      />
      <Gap gap={12} />
      <Select
        label="Transfer To:"
        placeholder={"Select Account"}
        value={toAccount}
        onChange={(account: AccountOption) => setToAccount(account)}
        options={filteredToAccounts}
      />
      <Gap gap={28} />
      <Row justifyContent="center">
        <Button
          size="xlarge"
          caption="Transfer Now!"
          disabled={
            transferCoin === undefined || toAccount === undefined || fromAccount === undefined
          }
          onClick={() =>
            transferNowOnClick({
              transferCoin: transferCoin,
              toAccount: toAccount,
              fromAccount: fromAccount,
            })
          }
          loading={isLoading}
        />
      </Row>
      <Gap gap={16} />
      <Row width="100%" justifyContent="end">
        <TextButton
          onClick={() => historyOnClick}
          caption="History"
          leftElement={<ListIcon width={16} height={16} />}
        />
      </Row>
    </ModalContainer>
  );
};

export default TransferCoinsModal;
