import { connectionStateTypesId } from "@components/display/Table/components/ConnectionStateLabel/types";

const dark = {
  name: "dark",

  zigWalletIndicator: {
    valueTextColor: "#FFFFFF",
    levelTextColor: "#706F82",
    tokenTextColor: "#9864EF",
  },

  percentageIndicator: {
    upTextColor: "#26C4C1",
    downTextColor: "#CA3E92",
  },

  connectionStateLabel: {
    textColor: {
      [connectionStateTypesId.CONNECTED]: "#26C4C1",
      [connectionStateTypesId.DISCONNECTED]: "#706F82",
      [connectionStateTypesId.HARD_DISCONNECT]: "#CA3E92",
      [connectionStateTypesId.SOFT_DISCONNECT]: "#F7CF00",
      [connectionStateTypesId.SUSPENDED]: "#E50B5A",
    },
  },

  table: {
    backgroundColor: "#131225",

    thead: {
      borderColor: "#222249",
      backgroundColor: "#222249",

      th: {
        textColor: "#F3F4F6",
      },
    },

    tbody: {
      textColor: "#F3F4F6",

      th: {
        borderBottomColor: "#222249",
      },
    },
  },

  priceLabel: {
    valueTextColor: "#F3F4F6",
    tokenTextColor: "#706F82",
  },

  dateLabel: {
    textColor: "#F3F4F6",
  },
};

export default dark;
