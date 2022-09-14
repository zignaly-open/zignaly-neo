import { ReactComponent as ZignalyIsotype } from "assets/images/zignaly-isotype.svg";
import { ReactComponent as ZignalyLogotype } from "assets/images/zignaly-logotype.svg";

// Icons
export const iconsByType = {
  isotype: ZignalyIsotype,
  logotype: ZignalyLogotype,
};

export type LogoProps = {
  type: keyof typeof iconsByType;
  width?: string;
  height?: string;
};
