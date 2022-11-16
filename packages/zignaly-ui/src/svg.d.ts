declare module "@metamask/jazzicon";

type SvgrComponent = React.StatelessComponent<
  React.SVGAttributes<SVGElement> & { alt?: string; color?: string }
>;

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; alt?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.svg?url" {
  const content: any;
  export default content;
}
