export function getImageOfAccount(index: number) {
  const id = (index % 6) + 1;
  return `/images/avatars/bg-${id}.png`;
}

export const getServiceLogo = (serviceLogo: string | null) =>
  serviceLogo || '/images/coin-broken.svg';
