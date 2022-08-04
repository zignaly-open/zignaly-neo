type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGElement> & { alt?: string }>;

declare module "*.svg" {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare module "*.svg";

declare module "*.svg?url" {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare module "*.svg?url";

declare module "@metamask/jazzicon";
