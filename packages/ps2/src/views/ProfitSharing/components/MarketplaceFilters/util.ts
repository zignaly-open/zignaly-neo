export const getPeriodCountFromDays = (days: number) => {
  const period = days >= 365 ? 'year' : days >= 30 ? 'month' : 'week';
  const count = days >= 365 ? days / 365 : days >= 30 ? days / 30 : days / 7;
  return { period, count };
};
