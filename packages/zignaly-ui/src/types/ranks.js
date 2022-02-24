// Assets
import WhaleIcon from '@assets/icons/whale-icon.svg';

export const rankTypesId = {
  DOLPHIN: 'dolphin',
  WHALE: 'whale'
};

export const rankTypes = {
  [rankTypesId.DOLPHIN]: {
    name: 'Dolphin',
    icon: WhaleIcon // TODO: Change to Dolphin Icon (pending of design)
  },
  [rankTypesId.WHALE]: {
    name: 'Whale',
    icon: WhaleIcon
  }
};
