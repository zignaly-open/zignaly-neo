import { WhitelabelOverride } from '../type';
import * as process from 'process';

export default {
  title: 'Zignaly',
  helpUrl: 'https://help.zignaly.com/hc/en-us',
  social: {
    twitter: 'https://twitter.com/zignaly',
    telegram: 'https://t.me/ZignalyHQ',
    discord: 'https://discord.gg/9H6cEa9uRN',
    medium: 'https://medium.com/zignaly',
    linkedin: 'https://www.linkedin.com/company/zignaly/',
  },
  intercomId: process.env.REACT_APP_INTERCOM_APP_ID,
} as WhitelabelOverride;
