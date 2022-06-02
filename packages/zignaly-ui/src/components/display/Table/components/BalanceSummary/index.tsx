/* eslint-disable multiline-ternary */
import React from "react";
import NumberFormat from "react-number-format";

// Components
import TextButton from "components/inputs/TextButton";

// Utils
import { isPositive } from "utils/numbers";

// Styles
import { Layout, Profit, TotalValue } from "./styles";

// Types
import { BalanceSummaryProps } from "./types";

// Icons
import PencilIcon from "assets/icons/pencil-icon.svg";

export const BalanceSummary = ({
  totalValue,
  profit,
  onClickEdit = () => {},
}: BalanceSummaryProps) => {
  const isPositiveProfit = isPositive(profit);
  const isEqual = profit === 0;

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
        leftElement={<PencilIcon color="#65647E" width={16} height={16} />}
        caption="Edit"
        color={"links"}
        onClick={onClickEdit}
      />
    </Layout>
  );
};
