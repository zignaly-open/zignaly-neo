export enum AvatarSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = 'x-large',
  XXLARGE = 'xx-large'
}

export type AvatarTypeProps = {
  size: AvatarSizes | any;
  hash?: string | any;
  image?: string | any;
};
