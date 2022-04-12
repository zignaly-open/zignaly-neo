export enum AvatarSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type AvatarTypeProps = {
  size: AvatarSizes | any;
  hash?: string;
  image?: string;
};
