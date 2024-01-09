import { ZigRisk } from "./types";

export const getRisk = (risk: number, risks: ZigRisk[]) => {
  return risks.find((r) => risk >= r.zrisk);
};
