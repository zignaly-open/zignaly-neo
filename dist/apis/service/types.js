var _a;
export var TraderServiceAccessLevel;
(function (TraderServiceAccessLevel) {
    TraderServiceAccessLevel[TraderServiceAccessLevel["Solo"] = 0] = "Solo";
    TraderServiceAccessLevel[TraderServiceAccessLevel["Private"] = 100] = "Private";
    TraderServiceAccessLevel[TraderServiceAccessLevel["Public"] = 200] = "Public";
    TraderServiceAccessLevel[TraderServiceAccessLevel["Marketplace"] = 500] = "Marketplace";
})(TraderServiceAccessLevel || (TraderServiceAccessLevel = {}));
export var GraphTimeframe;
(function (GraphTimeframe) {
    GraphTimeframe["7d"] = "7d";
    GraphTimeframe["30d"] = "30d";
    GraphTimeframe["90d"] = "90d";
    GraphTimeframe["180d"] = "180d";
    GraphTimeframe["365d"] = "365d";
})(GraphTimeframe || (GraphTimeframe = {}));
export var GraphTimeframeDayLength = (_a = {},
    _a[GraphTimeframe['7d']] = 7,
    _a[GraphTimeframe['30d']] = 30,
    _a[GraphTimeframe['90d']] = 90,
    _a[GraphTimeframe['180d']] = 180,
    _a[GraphTimeframe['365d']] = 365,
    _a);
export var GraphChartType;
(function (GraphChartType) {
    GraphChartType["investors"] = "investors";
    GraphChartType["sbt_ssc"] = "sbt_ssc";
    GraphChartType["pnl_ssc"] = "pnl_ssc";
    GraphChartType["pnl_pct"] = "pnl_pct";
    GraphChartType["at_risk_pct"] = "at_risk_pct";
    GraphChartType["pnl_pct_compound"] = "pnl_pct_compound";
})(GraphChartType || (GraphChartType = {}));
//# sourceMappingURL=types.js.map