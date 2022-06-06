import Typography from "components/display/Typography";
import Button from "components/inputs/Button";
import React from "react";
import { dark } from "theme";
import { BalanceSummary } from "../BalanceSummary";
import { ButtonContainer, Column, IconContainer, Layout, LiquidateButton, Row } from "./styles";
import ArrowLeftIcon from "assets/icons/arrow-right-icon.svg";
import { InvestColumnProps, InvestTypes } from "./types";

const InvestColumn = ({ type }: InvestColumnProps) => {
  const InvestStatus = () => {
    switch (type) {
      case InvestTypes.invested: {
        return Invested();
      }
      case InvestTypes.notInvested: {
        return NotInvested();
      }
      case InvestTypes.liquidated: {
        return Liquidated();
      }
      case InvestTypes.investedSeeAll: {
        return InvestedSeeAll();
      }
      case InvestTypes.notInvestedAllAccounts: {
        return NotInvestedAllAccounts();
      }
      default: {
        return <></>;
      }
    }
  };
  return (
    <Layout>
      {InvestStatus()}
      <IconContainer>
        <ArrowLeftIcon width={24} height={24} color={dark["neutral300"]} />
      </IconContainer>
    </Layout>
  );
};

const NotInvested = () => {
  return (
    <Row>
      <ButtonContainer>
        <Button size="medium" caption={"INVEST"} />
        <Typography variant="h5" color="neutral300">
          10% Success Fee
        </Typography>
      </ButtonContainer>
    </Row>
  );
};

const NotInvestedAllAccounts = () => {
  return (
    <Row>
      <ButtonContainer>
        <Button size="medium" caption={"INVEST"} />
        <Typography variant="h5" color="neutral300">
          10% Success Fee
        </Typography>
        <Button
          variant="secondary"
          caption={"All Accounts (3)"}
          rightElement={<ArrowLeftIcon height={20} width={20} color={dark["neutral300"]} />}
        />
      </ButtonContainer>
    </Row>
  );
};

const Invested = () => {
  return (
    <Row>
      <BalanceSummary profit={100} dashboardType={"marketplace"} />
    </Row>
  );
};

const InvestedSeeAll = () => {
  return (
    <Row>
      <Column>
        <BalanceSummary profit={100} dashboardType={"marketplace"} />
        <Button
          variant="secondary"
          caption={"See All (4)"}
          rightElement={<ArrowLeftIcon height={20} width={20} color={dark["neutral300"]} />}
        ></Button>
      </Column>
    </Row>
  );
};

const Liquidated = () => {
  return (
    <Row>
      <LiquidateButton>
        <Typography variant="buttonm" color="redGraphOrError">
          LIQUIDATED
        </Typography>
      </LiquidateButton>
    </Row>
  );
};

export default InvestColumn;
