import { format, formatDistance } from 'date-fns';
import i18n, { dateFnsLocaleMapping } from '../../../../util/i18n/i18next';

export const formatDateFromString = (date: string) =>
  formatLocalizedDistance(new Date(), new Date(date));

export const formatLocalizedDate = (date: Date | string, dateFormat = 'PP') => {
  return format(typeof date === 'string' ? new Date(date) : date, dateFormat, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });
};

export const formatLocalizedDistance = (date1: Date, date2: Date) =>
  formatDistance(date1, date2, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });

export const formatMonthDayYear = (date: Date) => format(date, 'dd/MM/yy');

export const formatMonthDay = (date: Date) =>
  formatMonthDayYear(date).replace(/, \d{4}$/, '');
