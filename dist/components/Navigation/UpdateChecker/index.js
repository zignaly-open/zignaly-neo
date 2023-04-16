import { useEffect } from 'react';
import { useUpdateCheck } from 'react-update-notification';
import { UpdateStatus } from 'react-update-notification/lib/types';
import { VERSION_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
var UpdateChecker = function () {
    var toast = useToast();
    var t = useTranslation('common').t;
    var _a = useUpdateCheck({
        type: 'interval',
        ignoreServerCache: true,
        interval: VERSION_CHECK_INTERVAL,
    }), status = _a.status, reloadPage = _a.reloadPage;
    useEffect(function () {
        if (status === UpdateStatus.available) {
            toast.info(t('refresh.short'), {
                autoClose: false,
                position: 'bottom-left',
                onClick: reloadPage,
            });
        }
    }, [status]);
    return null;
};
export default UpdateChecker;
//# sourceMappingURL=index.js.map