import React from 'react';
import { useTranslation } from 'react-i18next';
import * as styled from './styles';

import {
  ConnectionStateLabelId,
  ConnectionStateLabelProps,
  connectionStateName,
} from './types';

const ConnectionStateLabel = ({
  stateId = ConnectionStateLabelId.CONNECTED,
}: ConnectionStateLabelProps) => {
  const { t } = useTranslation('table');
  return (
    <styled.Layout stateId={stateId}>
      {t(connectionStateName[stateId])}
    </styled.Layout>
  );
};

export default ConnectionStateLabel;
