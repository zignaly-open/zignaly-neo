import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { ApiKeysContainer, TitleBox } from './atoms';
import { useParams } from 'react-router-dom';
import { useServiceApiKeysQuery } from '../../../../apis/serviceApiKey/api';
import CenteredLoader from '../../../../components/CenteredLoader';
import { useZModal } from '../../../../components/ZModal/use';
import CreateApiKey from './modals/CreateApiKey';
import EditApiKey from './modals/EditApiKey';
import Stub from '../../../../components/Stub';
import ApiKeyEntry from './components/ApiKeyEntry';
import { ExternalLink } from '../../../../components/AnchorLink';
var ApiKeyManagement = function () {
    var t = useTranslation(['management', 'actions']).t;
    var serviceId = useParams().serviceId;
    var showModal = useZModal().showModal;
    var _a = useServiceApiKeysQuery({ serviceId: serviceId }, { refetchOnMountOrArgChange: 30 }), isLoading = _a.isLoading, isFetching = _a.isFetching, keys = _a.data;
    return (React.createElement(React.Fragment, null,
        React.createElement(TitleBox, { sx: {
                display: 'flex',
                flexDirection: 'row',
            } },
            React.createElement(Box, { sx: {
                    flex: 1,
                    mr: 5,
                } },
                React.createElement(ZigTypography, { variant: 'h1' }, t('api-keys.title')),
                React.createElement(ZigTypography, { variant: 'body1' },
                    React.createElement(Trans, { i18nKey: 'api-keys.description', t: t },
                        React.createElement(ExternalLink, { href: 'https://trading.zignaly.com' })))),
            React.createElement(Box, { sx: {
                    alignSelf: 'center',
                } },
                React.createElement(ZigButton, { id: 'trader-api__create-key', onClick: function () {
                        return showModal(CreateApiKey, {
                            serviceId: serviceId,
                            afterSave: function (result) {
                                return showModal(EditApiKey, { apiKey: result, serviceId: serviceId });
                            },
                        });
                    }, variant: 'contained', size: 'large' }, t('api-keys.create-key')))),
        isLoading || isFetching ? (React.createElement(CenteredLoader, null)) : (React.createElement(ApiKeysContainer, null,
            !!keys.length && (React.createElement(ZigTypography, { color: 'neutral200', variant: 'h2' }, t('api-keys.manage-keys'))),
            !keys.length && (React.createElement(Stub, { title: t('api-keys.no-keys'), description: t('api-keys.no-keys-description') })),
            keys.map(function (apiKey) { return (React.createElement(ApiKeyEntry, { key: apiKey.id, apiKey: apiKey })); })))));
};
export default ApiKeyManagement;
//# sourceMappingURL=ApiKeyManagement.js.map