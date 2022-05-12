// Dependencies
import React from "react";
import { format } from "date-fns";

// Styled Components
import * as styled from "./styles";

const DateLabel = ({ date }: {date: Date}) => (
  <styled.Layout>
    <styled.Value variant={"body2"} weight={"regular"} hasLowercase>{format(date, "p")}</styled.Value>
    <styled.Value variant={"body2"} weight={"regular"}>{format(date, "PP")}</styled.Value>
  </styled.Layout>
);

export default DateLabel;
