import mui from "./mui";

const light = {
  name: "light",

  // MUI theme
  ...mui,
  palette: {
    mode: "light",
    // primary: {
    //   main: "#00dddd",
    // },
    // secondary: {
    //   main: "#326eb3",
    // },
    // text: {
    //   primary: "#172B4D",
    // },
  },

  zigWalletIndicator: {
    valueTextColor: "#FFFFFF",
    levelTextColor: "#706F82",
    tokenTextColor: "#9864EF",
  },
};

export default light;
