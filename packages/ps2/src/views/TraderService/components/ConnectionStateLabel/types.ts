import { darkMui } from '@zignaly-open/ui';

export const ConnectionStateLabelId = {
  CONNECTED: 'invested',
  PENDING: 'pending',
  SOFT_DISCONNECT: 'exiting',
  HARD_DISCONNECT: 'mystique',
  SUSPENDED: 'suspended',
  DISCONNECTED: 'ex_investor',
  OWNER: 'owner',
};

export const connectionStateName = {
  [ConnectionStateLabelId.CONNECTED]: 'status.connected',
  [ConnectionStateLabelId.PENDING]: 'status.pending',
  [ConnectionStateLabelId.SOFT_DISCONNECT]: 'status.soft-disconnect',
  [ConnectionStateLabelId.HARD_DISCONNECT]: 'status.hard-disconnect',
  [ConnectionStateLabelId.SUSPENDED]: 'status.suspended',
  [ConnectionStateLabelId.DISCONNECTED]: 'status.disconnected',
  [ConnectionStateLabelId.OWNER]: 'status.owner',
};

export const connectionStateColor = (theme: typeof darkMui) => ({
  [ConnectionStateLabelId.CONNECTED]: theme.palette.greenGraph,
  [ConnectionStateLabelId.PENDING]: theme.palette.neutral175,
  [ConnectionStateLabelId.SOFT_DISCONNECT]: theme.palette.yellow,
  [ConnectionStateLabelId.HARD_DISCONNECT]: theme.palette.redGraphOrError,
  [ConnectionStateLabelId.SUSPENDED]: theme.palette.red,
  [ConnectionStateLabelId.DISCONNECTED]: theme.palette.neutral400,
  [ConnectionStateLabelId.OWNER]: theme.palette.neutral100,
});

export type ConnectionStateLabelProps = {
  stateId: string;
};
