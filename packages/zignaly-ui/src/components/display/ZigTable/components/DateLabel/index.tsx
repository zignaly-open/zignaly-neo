import React from "react";
import { format } from "date-fns";

import * as styled from "./styles";

const DateLabel = ({ date, prefixId }: { date: Date; prefixId?: string }) => (
  <styled.Layout>
    <styled.Value
      id={prefixId && `${prefixId}-date__time`}
      variant={"body2"}
      fontWeight={"regular"}
      sx={{ textTransform: "lowercase" }}
    >
      {format(date, "p")}
    </styled.Value>
    <styled.Value
      id={prefixId && `${prefixId}-date__date`}
      variant={"body2"}
      fontWeight={"regular"}
    >
      {format(date, "PP")}
    </styled.Value>
  </styled.Layout>
);

export default DateLabel;
