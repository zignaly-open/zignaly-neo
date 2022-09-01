import { addDays, formatDistance } from 'date-fns';

export const formatDateFromDays = (days: string) =>
  formatDistance(addDays(new Date(), Number(days)), new Date());
