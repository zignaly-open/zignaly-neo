import { AvatarTypeProps } from "../../../Avatar/types";

export interface ServiceNameProps {
  heading: string | JSX.Element;
  subtitle: string | JSX.Element;
  cryptoName: string | JSX.Element;
  image?: AvatarTypeProps["image"];
}
