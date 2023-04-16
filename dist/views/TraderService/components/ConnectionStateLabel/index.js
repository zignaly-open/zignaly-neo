import React from 'react';
import { useTranslation } from 'react-i18next';
import * as styled from './styles';
import { ConnectionStateLabelId, connectionStateName, } from './types';
var ConnectionStateLabel = function (_a) {
    var _b = _a.stateId, stateId = _b === void 0 ? ConnectionStateLabelId.CONNECTED : _b;
    var t = useTranslation('investors').t;
    return (React.createElement(styled.Layout, { stateId: stateId }, t(connectionStateName[stateId])));
};
export default ConnectionStateLabel;
//# sourceMappingURL=index.js.map