type TraderServiceStatus = 'FULL' | string;

export type TraderState = {
  traderServices?: TraderService[];
  activeServiceId?: string;
};

export type TraderService = {
  operative: TraderServiceStatus;
  serviceId: string;
  serviceName: string;
};
