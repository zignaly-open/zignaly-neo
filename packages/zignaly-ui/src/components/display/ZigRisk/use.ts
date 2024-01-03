import { useMemo } from "react";
import { ReactComponent as Risk1Icon } from "assets/icons/risk/risk-1.svg";
import { ReactComponent as Risk2Icon } from "assets/icons/risk/risk-2.svg";
import { ReactComponent as Risk3Icon } from "assets/icons/risk/risk-3.svg";
import { ReactComponent as Risk4Icon } from "assets/icons/risk/risk-4.svg";
import { ReactComponent as Risk5Icon } from "assets/icons/risk/risk-5.svg";
import { getRisk } from "./util";
import { ZigRisk } from "./types";

export const useRisks = () => {
  return useMemo(
    () =>
      [
        {
          icon: Risk1Icon,
          label: "Very low risk",
          color: "#24b88e",
          id: 0,
          zrisk: 24,
        },
        {
          icon: Risk2Icon,
          label: "Low risk",
          color: "#9fcb6e",
          id: 1,
          zrisk: 18,
        },
        {
          icon: Risk3Icon,
          label: "Average risk",
          color: "#c2b864",
          id: 2,
          zrisk: 12,
        },
        {
          icon: Risk4Icon,
          label: "Risky",
          color: "#e7a675",
          id: 3,
          zrisk: 6,
        },
        {
          icon: Risk5Icon,
          label: "Very risky",
          color: "#f14a84",
          id: 4,
          zrisk: 0,
        },
      ] as ZigRisk[],
    [],
  );
};

export const useRisk = (zrisk: number) => {
  const risks = useRisks();

  return useMemo(() => {
    return getRisk(zrisk, risks);
  }, [zrisk, risks]);
};
