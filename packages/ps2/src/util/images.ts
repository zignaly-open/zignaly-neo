export function getImageOfAccount(index: number) {
  const id = (index % 6) + 1;
  return `/images/avatars/bg-${id}.png`;
}

export const getServiceLogo = (serviceLogo: string | null) =>
  serviceLogo || '/images/coin-broken.svg';

function downloadUri(name: string, url: string) {
  const a = document.createElement('a');
  a.setAttribute('download', name);
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.click();
}

export function downloadSvgElementAsSvgImage(
  svg: SVGElement | undefined,
  name: string,
) {
  if (!svg) return;
  const data = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  downloadUri(name, URL.createObjectURL(svgBlob));
}

const loadImage = async (url: string): Promise<HTMLImageElement> => {
  const img = document.createElement('img');
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const downloadSvgElementAsPngImage = async (
  svg: SVGElement | undefined,
  name: string,
  scale = 1,
) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  const svgData = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
  const img = await loadImage(svgData);

  const canvas = document.createElement('canvas');
  canvas.width = svg.clientWidth * scale;
  canvas.height = svg.clientHeight * scale;
  canvas
    .getContext('2d')
    .drawImage(img, 0, 0, svg.clientWidth * scale, svg.clientHeight * scale);

  const dataURL = await canvas.toDataURL(`image/png`, 1.0);
  downloadUri(name, dataURL);
};
