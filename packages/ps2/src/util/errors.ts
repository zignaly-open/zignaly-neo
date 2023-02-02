export enum ErrorCodes {
  PrivateService = 1073,
  SoloService = 1074,
  NoSuchService = 1053,
  ServiceApiKeyNotFound = 114,
  ServiceApiKeyDeletedByExchange = 1081,
}

export type BackendError = {
  data?: {
    error?: {
      code?: number;
      msg?: string;
    };
  };
};

export type BackendErrorResponse = {
  error: BackendError;
};
