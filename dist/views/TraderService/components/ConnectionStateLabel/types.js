var _a;
export var ConnectionStateLabelId = {
    CONNECTED: 'invested',
    PENDING: 'pending',
    SOFT_DISCONNECT: 'exiting',
    HARD_DISCONNECT: 'mystique',
    SUSPENDED: 'suspended',
    DISCONNECTED: 'ex_investor',
    OWNER: 'owner',
};
export var connectionStateName = (_a = {},
    _a[ConnectionStateLabelId.CONNECTED] = 'status.connected',
    _a[ConnectionStateLabelId.PENDING] = 'status.pending',
    _a[ConnectionStateLabelId.SOFT_DISCONNECT] = 'status.soft-disconnect',
    _a[ConnectionStateLabelId.HARD_DISCONNECT] = 'status.hard-disconnect',
    _a[ConnectionStateLabelId.SUSPENDED] = 'status.suspended',
    _a[ConnectionStateLabelId.DISCONNECTED] = 'status.disconnected',
    _a[ConnectionStateLabelId.OWNER] = 'status.owner',
    _a);
export var connectionStateColor = function (theme) {
    var _a;
    return (_a = {},
        _a[ConnectionStateLabelId.CONNECTED] = theme.palette.greenGraph,
        _a[ConnectionStateLabelId.PENDING] = theme.palette.neutral175,
        _a[ConnectionStateLabelId.SOFT_DISCONNECT] = theme.palette.yellow,
        _a[ConnectionStateLabelId.HARD_DISCONNECT] = theme.palette.redGraphOrError,
        _a[ConnectionStateLabelId.SUSPENDED] = theme.palette.red,
        _a[ConnectionStateLabelId.DISCONNECTED] = theme.palette.neutral400,
        _a[ConnectionStateLabelId.OWNER] = theme.palette.neutral100,
        _a);
};
//# sourceMappingURL=types.js.map