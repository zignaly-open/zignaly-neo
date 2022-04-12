// Assets
import WhaleIcon from "assets/icons/whale-icon.svg";

export enum RankTypesId {
  DOLPHIN = "dolphin",
  WHALE = "whale",
}

export const RankTypes = {
  [RankTypesId.DOLPHIN]: {
    name: "Dolphin",
    icon: WhaleIcon, // TODO: Change to Dolphin Icon (pending of design)
  },
  [RankTypesId.WHALE]: {
    name: "Whale",
    icon: WhaleIcon,
  },
};

export type ZigWalletIndicatorProps = {
  zigs: number;
  rankId: RankTypesId;
};
