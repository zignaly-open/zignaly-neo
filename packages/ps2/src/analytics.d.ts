type AnalyticsPlugin = import('analytics').AnalyticsPlugin;

declare module '@analytics/google-tag-manager' {
  type GoogleTagManagerConfig = {
    auth?: string;
    containerId: string;
    customScriptSrc?: string;
    dataLayerName?: string;
    debug?: boolean;
    execution?: string;
    preview?: string;
  };

  function googleTagManager(config: GoogleTagManagerConfig): AnalyticsPlugin;
  export default googleTagManager;
}

declare module '@analytics/customerio' {
  function customerIOServer(configuration: unknown): AnalyticsPlugin;
  export default customerIOServer;
}

declare module '@analytics/intercom' {
  function plugin(configuration: unknown): AnalyticsPlugin;
  export default plugin;
}
