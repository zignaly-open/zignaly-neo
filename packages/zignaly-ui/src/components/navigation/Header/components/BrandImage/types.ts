// Assets
import { ReactComponent as ZignalyIsotype } from "assets/images/zignaly-isotype.svg";
import { ReactComponent as ZignalyLogotype } from "assets/images/zignaly-logotype.svg";
import { ReactComponent as ZigbidsLogotype } from "assets/images/zigbids-logotype.svg";
import { ReactComponent as Facebook } from "assets/icons/social-icons/facebook.svg";
import { ReactComponent as Twitter } from "assets/icons/social-icons/twitter.svg";
import { ReactComponent as Linkedin } from "assets/icons/social-icons/linkedin.svg";
import { ReactComponent as Youtube } from "assets/icons/social-icons/youtube.svg";
import { ReactComponent as Discord } from "assets/icons/social-icons/discord.svg";
import { ReactComponent as Telegram } from "assets/icons/social-icons/telegram.svg";
import { ReactComponent as DiscordIconButton } from "assets/icons/social-icons/discord-minimalist.svg";
import { ReactComponent as SupportIconButton } from "assets/icons/social-icons/support-minimalist.svg";
// Icons
export const iconsByType = {
  isotype: ZignalyIsotype,
  logotype: ZignalyLogotype,
  zigbidslogotype: ZigbidsLogotype,
  facebooklogotype: Facebook,
  twitterlogoype: Twitter,
  linkedinlogotype: Linkedin,
  youtubelogotype: Youtube,
  discordlogotype: Discord,
  telegramlogotype: Telegram,
  discordiconbutton: DiscordIconButton,
  supporticonbutton: SupportIconButton,
};

export type LogoProps = {
  type: keyof typeof iconsByType;
  width?: string;
  height?: string;
};
