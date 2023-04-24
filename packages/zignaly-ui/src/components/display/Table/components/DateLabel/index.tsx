import React from "react";
import { format } from "date-fns";

import * as styled from "./styles";

const DateLabel = ({ date }: { date: Date }) => (
  <styled.Layout>
    <styled.Value variant={"body2"} fontWeight={"regular"} hasLowercase>
      {format(date, "p")}
    </styled.Value>
    <styled.Value variant={"body2"} fontWeight={"regular"}>
      {format(date, "PP")}
    </styled.Value>
  </styled.Layout>
);

export default DateLabel;
