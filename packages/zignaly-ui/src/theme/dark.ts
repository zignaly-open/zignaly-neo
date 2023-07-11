import Theme from "./theme";
import createMuiTheme from "./createMuiTheme";

const dark: Theme = {
  mode: "dark",
  fontFamily: ["Avenir Next", "Roboto", "Helvetica", "Arial", "sans-serif"],
  palette: {
    neutral900: "#06061A",
    neutral800: "#12152c",
    neutral750: "#171b30",
    neutral700: "#252339",
    neutral600: "#35334A",
    neutral500: "#4A4958",
    neutral400: "#706F82",
    neutral300: "#89899A",
    neutral200: "#A9A9BA",
    neutral175: "#889AD0",
    neutral150: "#BAC1E4",
    neutral100: "#C1C1C8",
    neutral000: "#E1E9F0",
    secondary: "#515AAC",
    highlighted: "#7682F7",
    redGraphOrError: "#CC3993",
    greenGraph: "#26c496",
    links: "#26C4C1",
    yellow: "#AE9C5B",
    red: "#CC394E",
    contrasting: "#F3F4F6",
  },
  backgrounds: {
    header: "linear-gradient(269.14deg, #080810 0%, #11122b 100%)",
    toastSuccess: "#122431",
    toastError: "#231630",
    tableHeader: "#08081d",
    secondaryBackground: "#0f0f25",
    tableRow: "#13122566",
    loader: "#fff",
    sliderMark: "#888999",
    sliderThumb: "#999ee0",
    buttonPrimary: "linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%)",
    input: "linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%)",
  },
  boxShadows: {
    tableHeader: "#16192b",
    button: "rgba(25, 25, 39, 0.36)",
    header: "rgba(0, 0, 0, 0.5)",
  },
  chart: {
    red: "#CC3993",
    green: "#039179",
    greenGradient: ["rgba(18, 33, 59, 0.52)", "rgba(33, 81, 78, 0.69)"],
    greenMiniGradient: ["rgba(17, 27, 47, 0)", "rgba(22, 41, 67, 0.5)", "rgba(39, 110, 107, 1)"],
    redGradient: ["rgba(31, 18, 59, 0.52)", "rgba(74, 33, 81, 0.69)"],
    redMiniGradient: ["rgba(18, 20, 39, 0)", "rgba(21, 21, 57, 0.5)", "rgba(86, 36, 108, 1)"],
    greenCard: [
      "rgba(16, 33, 33, 0.68)",
      "rgba(0, 45, 20, 0.44)",
      "rgba(7, 47, 30, 0.44)",
      "rgba(56, 235, 170, 0.69)",
    ],
    redCard: ["rgba(37, 15, 38, 0.38)", "rgba(46, 0, 28, 0.44)", "rgba(204, 57, 147, 0.69)"],
  },
};

export default dark;
export const darkMui = createMuiTheme(dark);
