// type AnalyticsPlugin = import('analytics').AnalyticsPlugin;
type AnalyticsPlugin = {
  /** Name of plugin */
  name: string;

  /** exposed events of plugin */
  EVENTS?: unknown;

  /** Configuration of plugin */
  config?: unknown;

  /** Load analytics scripts method */
  initialize?: (...params: unknown[]) => unknown;

  /** Page visit tracking method */
  page?: (...params: unknown[]) => unknown;

  /** Custom event tracking method */
  track?: (...params: unknown[]) => unknown;

  /** User identify method */
  identify?: (...params: unknown[]) => unknown;

  /** Function to determine if analytics script loaded */
  loaded?: (...params: unknown[]) => unknown;

  /** Fire function when plugin ready */
  ready?: (...params: unknown[]) => unknown;
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
