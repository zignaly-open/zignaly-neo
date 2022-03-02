// Dependencies
import React from "react";

// Styled Components
import * as styled from "./styles";

// Types
import { connectionStateName, connectionStateTypesId } from "./types";

const ConnectionStateLabel = ({
  stateId = connectionStateTypesId.CONNECTED,
}: {
  stateId: connectionStateTypesId;
}) => <styled.Layout stateId={stateId}>{connectionStateName[stateId]}</styled.Layout>;

export default React.memo(
  ConnectionStateLabel,
  (prevProps, nextProps) => prevProps.stateId === nextProps.stateId,
);
