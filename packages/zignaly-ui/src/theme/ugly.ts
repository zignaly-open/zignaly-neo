import Theme from "./theme";
import createMuiTheme from "./createMuiTheme";

const ugly: Theme = {
  mode: "light",
  palette: {
    neutral900: "#fba9a5",
    neutral800: "#fa7f79",
    neutral750: "#F96860",
    neutral700: "#F75850",
    neutral600: "#ec463c",
    neutral500: "#F42015",
    neutral400: "#D6140A",
    neutral300: "#9D0E07",
    neutral200: "#890C06",
    neutral175: "#a81a79",
    neutral150: "#760A04",
    neutral100: "#620804",
    neutral000: "#490300",
    secondary: "#af558b",
    highlighted: "#e10095",
    redGraphOrError: "#cc3939",
    greenGraph: "#53c426",
    links: "#9c00a9",
    yellow: "#ffc800",
    red: "#ff0024",
    contrasting: "#030406",
  },
  backgrounds: {
    header: "linear-gradient(269.14deg, #ffcccc 0%, #eebbbb 100%)",
    buttonPrimary: "linear-gradient(289.8deg, #f99 0%, #f9f 100%)",
    buttonPrimaryHover: "linear-gradient(#fcc,#fcf)",
    tableHeader: "#f88",
    loader: "#f9a",
    sliderMark: "#aa8999",
    sliderThumb: "#bb9e90",
    tableRow: "#ff999966",
    secondaryBackground: "#eebbbb",
    toastSuccess: "#9f9",
    toastError: "#f99",
    input: "linear-gradient(90deg, #F96860 0%, #F96860 100%)",
  },
  boxShadows: {
    tableHeader: "#fcc",
    button: "#ffffffaa",
    header: "rgba(255, 255, 255, 0.3)",
  },
  chart: {
    red: "#f00",
    green: "#0f0",
    greenGradient: ["rgba(18, 33, 18, 0.52)", "rgba(33, 81, 33, 0.69)"],
    greenMiniGradient: ["rgba(17, 27, 17, 0)", "rgba(22, 67, 22, 0.5)", "rgba(39, 110, 39, 1)"],
    redGradient: ["rgba(131, 59, 59, 0.52)", "rgba(174, 81, 81, 0.69)"],
    redMiniGradient: [
      "rgba(181, 59, 59, 0.52)",
      "rgba(174, 81, 81, 0.69)",
      "rgba(164, 81, 81, 0.69)",
      "rgba(154, 81, 81, 0.69)",
    ],
    greenCard: [
      "rgba(16, 33, 33, 0.68)",
      "rgba(0, 45, 20, 0.44)",
      "rgba(7, 47, 30, 0.44)",
      "rgba(56, 235, 170, 0.69)",
    ],
    redCard: ["rgba(137, 38, 38, 0.38)", "rgba(96, 28, 28, 0.44)", "rgba(204, 147, 147, 0.69)"],
  },
};

export default ugly;
export const uglyMui = createMuiTheme(ugly);
