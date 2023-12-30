export const getRisk = (risk: number, risks) => {
  return risks.find((r) => risk >= r.zrisk);
};
