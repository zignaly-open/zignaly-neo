import { useMemo } from "react";
import { ReactComponent as Risk1Icon } from "assets/icons/risk/risk-1.svg";
import { ReactComponent as Risk2Icon } from "assets/icons/risk/risk-2.svg";
import { ReactComponent as Risk3Icon } from "assets/icons/risk/risk-3.svg";
import { ReactComponent as Risk4Icon } from "assets/icons/risk/risk-4.svg";
import { ReactComponent as Risk5Icon } from "assets/icons/risk/risk-5.svg";
import { getRisk } from "./util";
import { ZigRisk } from "./types";
import { useTranslation } from "react-i18next";

export const useRisks = (short = false) => {
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigRisk" });

  return useMemo(
    () =>
      [
        {
          icon: Risk1Icon,
          label: t(`very-low${short ? "" : "-risk"}`),
          color: "#24b88e",
          id: 0,
          zrisk: 24,
        },
        {
          icon: Risk2Icon,
          label: t(`low${short ? "" : "-risk"}`),
          color: "#9fcb6e",
          id: 1,
          zrisk: 18,
        },
        {
          icon: Risk3Icon,
          label: t(`average${short ? "" : "-risk"}`),
          color: "#c2b864",
          id: 2,
          zrisk: 12,
        },
        {
          icon: Risk4Icon,
          label: t("risky"),
          color: "#e7a675",
          id: 3,
          zrisk: 6,
        },
        {
          icon: Risk5Icon,
          label: t("very-risky"),
          color: "#f14a84",
          id: 4,
          zrisk: 0,
        },
      ] as ZigRisk[],
    [],
  );
};

export const useRisk = (zrisk: number, short?: boolean) => {
  const risks = useRisks(short);

  return useMemo(() => {
    return getRisk(zrisk, risks);
  }, [zrisk, risks]);
};
