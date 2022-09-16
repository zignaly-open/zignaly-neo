import { ReactComponent as ZignalyIsotype } from "assets/images/zignaly-isotype.svg";
import { ReactComponent as ZignalyLogotype } from "assets/images/zignaly-logotype.svg";
import { ReactComponent as ZigbidsLogotype } from "assets/images/zigbids-logotype.svg";

// Icons
export const iconsByType = {
  isotype: ZignalyIsotype,
  logotype: ZignalyLogotype,
  zigbidslogotype: ZigbidsLogotype,
};

export type LogoProps = {
  type: keyof typeof iconsByType;
  width?: string;
  height?: string;
};
