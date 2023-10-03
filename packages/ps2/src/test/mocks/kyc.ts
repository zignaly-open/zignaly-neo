export const kycDataResponseMock = {
  KYCMonitoring: false,
  status: [
    {
      status: 'init',
      level: 'QUA_individual_sandbox',
      order: 1,
      category: 'KYC',
    },
    {
      status: 'init',
      level: 'QUA_individual_sandbox_2',
      order: 2,
      category: 'KYC',
    },
    {
      status: 'init',
      level: 'QUA_individual_sandbox_KYB',
      order: 1,
      category: 'KYB',
    },
    {
      status: null,
      level: 'QUA_individual_sandbox_KYB_2',
      order: 2,
      category: 'KYB',
    },
  ],
};
