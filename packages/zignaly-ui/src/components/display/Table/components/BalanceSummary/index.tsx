/* eslint-disable multiline-ternary */
import TextButton from "components/inputs/TextButton";
import React from "react";
import NumberFormat from "react-number-format";
import { isPositive } from "utils/numbers";
import { Layout, Profit, TotalValue } from "./styles";
import { BalanceSummaryProps } from "./types";
import PencileIcon from "assets/icons/pencil-icon.svg";

export const BalanceSummary = ({ totalValue, profit }: BalanceSummaryProps) => {
  const isPositiveProfit = isPositive(profit);
  const isEqual = profit === 0 ? true : false;
  return (
    <Layout isPositive={isPositiveProfit} isEqual={isEqual}>
      <TotalValue>
        {"$"}
        <NumberFormat
          value={String(totalValue).replaceAll("-", "")}
          displayType={"text"}
          thousandSeparator={true}
        />
      </TotalValue>
      <Profit variant="body2">
        {isEqual ? "+" : isPositiveProfit ? "+" : "-"}
        <NumberFormat
          value={String(profit).replaceAll("-", "")}
          displayType={"text"}
          thousandSeparator={true}
        />
      </Profit>
      <TextButton
        leftElement={<PencileIcon color="#65647E" width={16} height={16} />}
        caption="Edit"
        color={"links"}
      ></TextButton>
    </Layout>
  );
};
