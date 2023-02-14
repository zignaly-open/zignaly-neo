import { addDays, formatDistance, format } from 'date-fns';
import i18n, { dateFnsLocaleMapping } from '../../../../util/i18next';

export const formatDateFromDays = (days: string) =>
  formatLocalizedDistance(addDays(new Date(), Number(days)), new Date());

export const formatLocalizedDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });

export const formatLocalizedDistance = (date1: Date, date2: Date) =>
  formatDistance(date1, date2, {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  });

export const formatMonthDay = (date: Date) =>
  format(date, 'PP', {
    locale: dateFnsLocaleMapping?.[i18n.language] || dateFnsLocaleMapping.en,
  }).replace(/, \d{4}$/, '');
