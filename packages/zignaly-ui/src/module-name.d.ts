declare module "@metamask/jazzicon";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.svg?url" {
  const content: any;
  export default content;
}
