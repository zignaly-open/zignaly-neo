import Theme from "theme/theme";

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

export const connectionStateColor = (theme: Theme) => ({
  [ConnectionStateLabelId.CONNECTED]: theme["greenGraph"],
  [ConnectionStateLabelId.DISCONNECTED]: theme["neutral400"],
  [ConnectionStateLabelId.HARD_DISCONNECT]: theme["redGraphOrError"],
  [ConnectionStateLabelId.SOFT_DISCONNECT]: theme["yellow"],
  [ConnectionStateLabelId.SUSPENDED]: theme["red"],
});

export type ConnectionStateLabelProps = {
  stateId: string;
};
