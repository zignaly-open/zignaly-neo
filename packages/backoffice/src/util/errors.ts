export type BackendError = {
  data?: {
    error?: {
      code?: number;
      msg?: string;
    };
  };
};
