// Mobile
export const isMobile = (query: string) => {
  return `@media screen and (min-width: 0px) and (max-width: 800px) { ${query} }`;
};

export const isTablet = (query: string) => {
  return `@media screen and (min-width: 801px) and (max-width: 1100px) { ${query} }`;
};

export const media = (size: number, query: string) => {
  return `@media screen and (min-width: ${size}px) { ${query} }`;
};

export const isNotMobile = (query: string) => {
  return `@media screen and (min-width: 990px) { ${query} }`;
};
