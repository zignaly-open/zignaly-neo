import Theme from '@zignaly-open/ui/lib/theme/theme';

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

export const connectionStateColor = (theme: Theme) => ({
  [ConnectionStateLabelId.CONNECTED]: theme.greenGraph,
  [ConnectionStateLabelId.PENDING]: theme.neutral175,
  [ConnectionStateLabelId.SOFT_DISCONNECT]: theme.yellow,
  [ConnectionStateLabelId.HARD_DISCONNECT]: theme.redGraphOrError,
  [ConnectionStateLabelId.SUSPENDED]: theme.red,
  [ConnectionStateLabelId.DISCONNECTED]: theme.neutral400,
  [ConnectionStateLabelId.OWNER]: theme.neutral100,
});

export type ConnectionStateLabelProps = {
  stateId: string;
};
