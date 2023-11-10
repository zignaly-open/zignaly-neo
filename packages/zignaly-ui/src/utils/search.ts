export const fixSearchParams = <T>(params: Record<string, T>): Record<string, T> => {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => !!value || value === 0));
};
