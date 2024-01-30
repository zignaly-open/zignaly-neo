import {
  ZigLogoTelegramIcon,
  ZigLogoMediumIcon,
  ZigLogoDiscordIcon,
  ZigLogoTwitterIcon,
  ZigLogoLinkedInIcon,
} from '@zignaly-open/ui/icons';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { whitelabel } from '../whitelabel';

const socialNetworksLinks = [
  {
    name: 'Twitter',
    image: ZigLogoTwitterIcon,
    path: whitelabel.social?.twitter,
  },
  {
    name: 'Telegram',
    image: ZigLogoTelegramIcon,
    path: whitelabel.social?.telegram,
  },
  {
    name: 'Discord',
    image: ZigLogoDiscordIcon,
    path: whitelabel.social?.discord,
  },
  {
    name: 'Instagram',
    image: InstagramIcon,
    path: whitelabel.social?.instagram,
  },
  {
    name: 'Youtube',
    image: YouTubeIcon,
    path: whitelabel.social?.youtube,
  },
  {
    name: 'Medium',
    image: ZigLogoMediumIcon,
    path: whitelabel.social?.medium,
  },
  {
    name: 'LinkedIn',
    image: ZigLogoLinkedInIcon,
    path: whitelabel.social?.linkedin,
  },
].filter((item) => item.path);

export default socialNetworksLinks;
