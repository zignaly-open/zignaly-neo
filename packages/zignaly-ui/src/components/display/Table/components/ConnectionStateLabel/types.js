export const connectionStateTypesId = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  HARD_DISCONNECT: 'hard-disconnect',
  SOFT_DISCONNECT: 'soft-disconnect',
  SUSPENDED: 'suspended'
};

export const connectionStateName = {
  [connectionStateTypesId.CONNECTED]: 'Connected',
  [connectionStateTypesId.DISCONNECTED]: 'Disconnected',
  [connectionStateTypesId.HARD_DISCONNECT]: 'Hard-Disconnect',
  [connectionStateTypesId.SOFT_DISCONNECT]: 'Soft-Disconnect',
  [connectionStateTypesId.SUSPENDED]: 'Suspended'
};
