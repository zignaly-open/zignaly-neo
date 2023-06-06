export enum AvatarSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "x-large",
  XXLARGE = "xx-large",
}

export type AvatarTypeProps = {
  size?: AvatarSizes | AvatarSizes[keyof AvatarSizes] | number;
  alt?: string;
  hash?: string | any;
  image?: string | any;
  id?: string;
};
