// Dependencies
// @ts-nocheck
import React, { useState, useMemo } from "react";
import { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

// Components
import {
  Investor,
  InvestorName,
  InvestorData,
  InvestorSuccessFee,
  PendingTransaction,
  Field,
  Row,
  AmountInvested,
  TokenImage,
  TokenValue,
  Actions,
  Inline,
  Form,
  InputContainer,
} from "./styles";
import Avatar from "../../display/Avatar";
import ModalContainer from "../ModalContainer";
import Typography from "../../display/Typography";
import TextButton from "../../inputs/TextButton";
import Button from "../../inputs/Button";
import Table from "../../display/Table";
import DateLabel from "../../display/Table/components/DateLabel";
import PriceLabel from "../../display/Table/components/PriceLabel";
import InputAmount from "../../inputs/InputAmount";

// Assets
import RefreshIcon from "assets/icons/refresh-icon.svg";
import BTCIcon from "assets/icons/coins/btc.svg?url";
import PlusIcon from "assets/icons/plus-icon.svg";
import ArrowRightIcon from "assets/icons/arrow-right-icon.svg";
import ArrowLeftIcon from "assets/icons/arrow-left-icon.svg";
import InvestSlider from "../../display/InvestSlider";

// Utils
import { BigNumber, utils } from "ethers";

// Props
import { EditInvestmentFormProps, EditInvestmentWithModalProps, viewsIds } from "./types";

function EditInvestmentWithModal({
  investorName,
  investorPictureUrl,
  investorSuccessFee,
  pendingTransactions = 0,

  amountInvested = BigNumber.from("0"),
  reinvestPercentage = "20",
  withdrawPercentage = "20",
  coin = {
    id: "btc",
    image: BTCIcon,
    name: "BTC",
    balance: BigNumber.from("1000000000000000000000000"),
  },
  onAmountSubmit = () => {},
  onClickWithdrawInvestment = () => {},
}: EditInvestmentWithModalProps) {
  // Hooks
  const theme: any = useTheme();
  const [currentState, setCurrentState] = useState(viewsIds.EDIT_INVESTMENT);
  const [isInputEnabled, setInputEnabled] = useState(false);

  // Form
  const { getValues, setValue, handleSubmit } = useForm<EditInvestmentFormProps>({
    defaultValues: {
      moreInvestmentValue: BigNumber.from("0"),
      reinvestPercentageValue: reinvestPercentage,
      withdrawPercentageValue: withdrawPercentage,
    },
  });

  if (currentState === viewsIds.PENDING_TRANSACTIONS) {
    return (
      <ModalContainer
        width={784}
        onGoBack={() => setCurrentState(viewsIds.EDIT_INVESTMENT)}
        title={"Edit Investment with"}
      >
        <Table
          columns={[
            {
              Header: "Date",
              accessor: "date",
            },
            {
              Header: "Amount",
              accessor: "amount",
            },
            {
              Header: "Type",
              accessor: "type",
            },
            {
              Header: "Status",
              accessor: "status",
            },
          ]}
          data={[
            {
              date: <DateLabel date={new Date()} />,
              amount: <PriceLabel value={10000} coin={"USDT"} />,
              type: "Investment",
              status: "Processing in 24 hrs",
              action: (
                <TextButton
                  caption={"Cancel"}
                  onClick={() => setCurrentState(viewsIds.PENDING_TRANSACTIONS)}
                />
              ),
            },
          ]}
          hideOptionsButton={false}
          isUserTable={true}
        />

        <Actions>
          <Button
            leftElement={<ArrowLeftIcon color={"#fff"} width={"20px"} height={"20px"} />}
            onClick={() => setCurrentState(viewsIds.EDIT_INVESTMENT)}
            size={"large"}
            caption={"Back"}
          />
        </Actions>
      </ModalContainer>
    );
  }

  const renderPendingTransactions = useMemo(
    () =>
      pendingTransactions > 0 ? (
        <PendingTransaction>
          <Inline>
            <RefreshIcon />
            <Typography variant={"body1"} color={"yellow"}>
              You have {pendingTransactions} pending transaction
            </Typography>
          </Inline>
          <div>
            <TextButton
              rightElement={
                <ArrowRightIcon width={"22px"} height={"22px"} color={theme["links"]} />
              }
              caption={"View"}
              onClick={() => setCurrentState(viewsIds.PENDING_TRANSACTIONS)}
            />
          </div>
        </PendingTransaction>
      ) : null,
    [pendingTransactions],
  );

  return (
    <ModalContainer title={"Edit Investment with"} width={784}>
      {/* Investor Details */}
      <Investor>
        <Avatar size={"x-large"} image={investorPictureUrl} />
        <InvestorData>
          <InvestorName variant={"h1"} color={"neutral000"}>
            {investorName}
          </InvestorName>
          <InvestorSuccessFee variant={"body2"} color={"neutral300"}>
            {investorSuccessFee}% Success fee
          </InvestorSuccessFee>
        </InvestorData>
      </Investor>

      {/* Pending Transactions View */}
      {renderPendingTransactions}

      {/* Form */}
      <Form onSubmit={handleSubmit(onAmountSubmit)}>
        <Field>
          <Row>
            <Typography variant={"labelm"}>Amount Invested</Typography>
            <AmountInvested>
              <TokenImage src={coin.image} />
              <TokenValue>
                <Typography
                  variant={"bigNumber"}
                  className={"investmentAmount"}
                  color={"neutral100"}
                >
                  <NumberFormat
                    value={utils.formatUnits((amountInvested || "0").toString())}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </Typography>
                <Typography variant={"h3"} color={"neutral400"}>
                  {coin.name}
                </Typography>
              </TokenValue>
            </AmountInvested>
          </Row>
          <Row>
            <InvestSlider
              label={"What to do with profits:"}
              value={Number(getValues("withdrawPercentageValue"))}
              initialValue={Number(getValues("withdrawPercentageValue"))}
              onChange={({ reinvest, withdraw }: { reinvest: string; withdraw: string }) => {
                setValue("reinvestPercentageValue", reinvest.toString());
                setValue("withdrawPercentageValue", withdraw.toString());
              }}
            />
          </Row>
        </Field>

        {isInputEnabled && (
          <InputContainer>
            <InputAmount
              label={"Amount to Invest:"}
              tokens={[
                {
                  id: coin.id,
                  name: coin.name,
                  image: coin.image,
                  balance: coin.balance,
                },
              ]}
              value={getValues("moreInvestmentValue")}
              onChange={({ target: { value } }: any) => {
                setValue("moreInvestmentValue", value);
              }}
            />
          </InputContainer>
        )}

        <Actions>
          {!isInputEnabled && (
            <TextButton
              onClick={() => setInputEnabled(true)}
              leftElement={<PlusIcon width={"22px"} height={"22px"} />}
              caption={"Invest more"}
            />
          )}
          <Button
            size={"large"}
            type={"submit"}
            caption={isInputEnabled ? "Add to Investment" : "Save and Close"}
          />
          <TextButton
            rightElement={<ArrowRightIcon width={"22px"} height={"22px"} color={theme["links"]} />}
            onClick={onClickWithdrawInvestment}
            caption={"Withdraw Investment"}
          />
        </Actions>
      </Form>
    </ModalContainer>
  );
}

export default EditInvestmentWithModal;
