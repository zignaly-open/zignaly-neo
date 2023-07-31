// type AnalyticsPlugin = import('analytics').AnalyticsPlugin;
type AnalyticsPlugin = {
  /** Name of plugin */
  name: string;

  /** exposed events of plugin */
  EVENTS?: any;

  /** Configuration of plugin */
  config?: any;

  /** Load analytics scripts method */
  initialize?: (...params: any[]) => any;

  /** Page visit tracking method */
  page?: (...params: any[]) => any;

  /** Custom event tracking method */
  track?: (...params: any[]) => any;

  /** User identify method */
  identify?: (...params: any[]) => any;

  /** Function to determine if analytics script loaded */
  loaded?: (...params: any[]) => any;

  /** Fire function when plugin ready */
  ready?: (...params: any[]) => any;
};

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
