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
  id,
}: ConnectionStateLabelProps) => {
  const { t } = useTranslation('investors');
  return (
    <styled.Layout stateId={stateId} id={id}>
      {t(connectionStateName[stateId])}
    </styled.Layout>
  );
};

export default ConnectionStateLabel;
