export const ConnectionStateLabelId = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  HARD_DISCONNECT: "hard-disconnect",
  SOFT_DISCONNECT: "soft-disconnect",
  SUSPENDED: "suspended",
};

export const connectionStateName = {
  [ConnectionStateLabelId.CONNECTED]: "Connected",
  [ConnectionStateLabelId.DISCONNECTED]: "Disconnected",
  [ConnectionStateLabelId.HARD_DISCONNECT]: "Hard-Disconnect",
  [ConnectionStateLabelId.SOFT_DISCONNECT]: "Soft-Disconnect",
  [ConnectionStateLabelId.SUSPENDED]: "Suspended",
};

export const connectionStateColor = {
  [ConnectionStateLabelId.CONNECTED]: "#26C4C1",
  [ConnectionStateLabelId.DISCONNECTED]: "#706F82",
  [ConnectionStateLabelId.HARD_DISCONNECT]: "#CC3993",
  [ConnectionStateLabelId.SOFT_DISCONNECT]: "#F7CF00",
  [ConnectionStateLabelId.SUSPENDED]: "#E50B5A",
};

export type ConnectionStateLabelProps = {
  stateId: string;
};
