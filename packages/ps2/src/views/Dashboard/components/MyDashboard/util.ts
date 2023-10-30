import { addDays, format, formatDistance } from 'date-fns';
import i18n, { dateFnsLocaleMapping } from '../../../../util/i18next';

export const formatDateFromDays = (days: string) =>
  formatLocalizedDistance(addDays(new Date(), Number(days)), new Date());

export const formatLocalizedDate = (date: Date | string, dateFormat = 'PP') => {
  return format(typeof date === 'string' ? new Date(date) : date, dateFormat, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });
};

export const formatLocalizedDistance = (date1: Date, date2: Date) =>
  formatDistance(date1, date2, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });

export const formatMonthDayYear = (date: Date) =>
  format(date, 'PP', {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });

export const formatMonthDay = (date: Date) =>
  formatMonthDayYear(date).replace(/, \d{4}$/, '');

export const formatCompactNumber = (value: number | string, precision = 8) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(+value);