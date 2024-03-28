function createLogoImage(
  logo: string,
  bgColor: string,
  {
    width,
    height,
    logoWidth,
    logoHeight,
  }: { width: number; height: number; logoWidth: number; logoHeight?: number },
): Promise<File | null> {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      const logoImg = new Image();
      logoImg.src = logo + '?crossorigin';
      logoImg.setAttribute('crossOrigin', 'anonymous');
      logoImg.onload = function () {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          logoImg,
          width / 2 - logoWidth / 2,
          height / 2 - (logoHeight || logoWidth) / 2,
          logoWidth,
          logoHeight || logoWidth,
        );
        convertCanvasToFile(canvas).then(resolve);
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      resolve(null);
    }
  });
}
function convertCanvasToFile(canvas: HTMLCanvasElement): Promise<File> {
  return new Promise((r) =>
    canvas.toBlob((blob) => {
      r(new File([blob], 'image.png'));
    }),
  );
}

export function generateSplashscreen(
  logo: string,
  bgColor: string,
): Promise<File | null> {
  return createLogoImage(logo, bgColor, {
    width: 2048,
    height: 2732,
    logoWidth: 512,
  });
}

export function generateLogoWithBackground(
  logo: string,
  bgColor: string,
): Promise<File | null> {
  return createLogoImage(logo, bgColor, {
    width: 512,
    height: 512,
    logoWidth: 380,
  });
}
