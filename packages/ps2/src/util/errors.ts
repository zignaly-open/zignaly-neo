export enum ErrorCodes {
  PrivateService = 1073,
  SoloService = 1074,
  NoSuchService = 1053,
}

export type BackendError = {
  data?: {
    error?: {
      code?: number;
    };
  };
};
