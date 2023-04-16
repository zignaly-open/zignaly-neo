import { addDays, format, formatDistance } from 'date-fns';
import i18n, { dateFnsLocaleMapping } from '../../../../util/i18next';
export var formatDateFromDays = function (days) {
    return formatLocalizedDistance(addDays(new Date(), Number(days)), new Date());
};
export var formatLocalizedDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'PP'; }
    return format(typeof date === 'string' ? new Date(date) : date, dateFormat, {
        locale: (dateFnsLocaleMapping === null || dateFnsLocaleMapping === void 0 ? void 0 : dateFnsLocaleMapping[i18n.language]) || dateFnsLocaleMapping.en,
    });
};
export var formatLocalizedDistance = function (date1, date2) {
    return formatDistance(date1, date2, {
        locale: (dateFnsLocaleMapping === null || dateFnsLocaleMapping === void 0 ? void 0 : dateFnsLocaleMapping[i18n.language]) || dateFnsLocaleMapping.en,
    });
};
export var formatMonthDay = function (date) {
    return format(date, 'PP', {
        locale: (dateFnsLocaleMapping === null || dateFnsLocaleMapping === void 0 ? void 0 : dateFnsLocaleMapping[i18n.language]) || dateFnsLocaleMapping.en,
    }).replace(/, \d{4}$/, '');
};
export var formatCompactNumber = function (value, precision) {
    if (precision === void 0) { precision = 8; }
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: precision,
        notation: 'compact',
        compactDisplay: 'short',
    }).format(+value);
};
//# sourceMappingURL=util.js.map