export function getImageOfAccount(index: number) {
  const id = index % 7;
  return `/images/avatars/avatar-${id}.svg`;
}

export const getServiceLogo = (serviceLogo: string | null) =>
  serviceLogo === '' || !serviceLogo ? '/images/coin-broken.svg' : serviceLogo;
