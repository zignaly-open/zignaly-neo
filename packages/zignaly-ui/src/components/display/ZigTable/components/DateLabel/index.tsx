import React from "react";
import { format } from "date-fns";

import * as styled from "./styles";

const DateLabel = ({ date, id }: { date: Date; id?: string }) => (
  <styled.Layout id={id}>
    <styled.Value
      className={"date__time"}
      variant={"body2"}
      fontWeight={"regular"}
      sx={{ textTransform: "lowercase" }}
    >
      {format(date, "p")}
    </styled.Value>
    <styled.Value className={"date__date"} variant={"body2"} fontWeight={"regular"}>
      {format(date, "PP")}
    </styled.Value>
  </styled.Layout>
);

export default DateLabel;
