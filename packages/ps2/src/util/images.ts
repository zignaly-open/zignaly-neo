export function getImageOfAccount(index: number) {
  const id = (index % 6) + 1;
  return `/images/avatars/bg-${id}.png`;
}

export const getServiceLogo = (serviceLogo: string | null) =>
  serviceLogo || '/images/coin-broken.svg';

export function downloadSvgElementAsImage(
  svg: HTMLOrSVGElement | undefined,
  name: string,
) {
  if (!svg) return;
  const data = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const a = document.createElement('a');
  a.setAttribute('download', name);
  a.setAttribute('href', URL.createObjectURL(svgBlob));
  a.setAttribute('target', '_blank');
  a.click();
}
