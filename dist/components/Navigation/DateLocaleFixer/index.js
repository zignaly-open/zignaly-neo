import { useEffect } from 'react';
import { setDefaultOptions } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { dateFnsLocaleMapping } from '../../../util/i18next';
export default function DateLocaleFixer() {
    var locale = useTranslation().i18n.language;
    useEffect(function () {
        locale &&
            setDefaultOptions({
                locale: dateFnsLocaleMapping[locale !== 'ch' ? locale.split('_')[0] : 'ru'] ||
                    dateFnsLocaleMapping.en,
            });
    }, [locale]);
    return null;
}
//# sourceMappingURL=index.js.map