export const getMonthsFromColumnId = (columnId: string) => {
  const days = columnId.match(/\d+/);
  return days ? Math.round(parseInt(days[0], 10) / 30) : null;
};
