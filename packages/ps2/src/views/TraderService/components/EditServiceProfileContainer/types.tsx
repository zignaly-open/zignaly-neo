import { TraderServiceAccessLevel } from 'apis/service/types';

export const VISIBILITY_LABEL = {
  [TraderServiceAccessLevel.Solo]: {
    key: 'unlisted',
    color: '#706F82',
  },
  [TraderServiceAccessLevel.Private]: {
    key: 'private',
    color: '#f7cf00',
  },
  [TraderServiceAccessLevel.Public]: {
    key: 'public',
    color: '#e18728',
  },
  [TraderServiceAccessLevel.Marketplace]: {
    key: 'marketplace',
    color: '#26c496',
  },
};
