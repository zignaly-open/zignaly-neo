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
  [ConnectionStateLabelId.CONNECTED]: 'table.status.connected',
  [ConnectionStateLabelId.PENDING]: 'table.status.pending',
  [ConnectionStateLabelId.SOFT_DISCONNECT]:
    'table:table.status.soft-disconnect',
  [ConnectionStateLabelId.HARD_DISCONNECT]:
    'table:table.status.hard-disconnect',
  [ConnectionStateLabelId.SUSPENDED]: 'table:table.status.suspended',
  [ConnectionStateLabelId.DISCONNECTED]: 'table:table.status.disconnected',
  [ConnectionStateLabelId.OWNER]: 'table:table.status.owner',
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
