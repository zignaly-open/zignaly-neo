import { ThemeStyledComponents } from "../types";
// TODO: fix this, smth weird with type defs not loading
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isWebpSupported } from "react-image-webp/dist/utils";

// thanks Jest, very cool
const tryIsWebpSupported = () => {
  try {
    return isWebpSupported();
  } catch {
    return false;
  }
};

const dark: ThemeStyledComponents = {
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
    lightGrayBlue: "#707185",
    darkGreen: "#156747",
    labelCheckbox: "#4f4f5e",
    checkboxPrimary: "#2a2a36",
    lightGrey: "#9ca3af",
    paleBlue: "#999fe1", // TODO: fix
  },
  backgrounds: {
    body: `url(${
      tryIsWebpSupported()
        ? "https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/4048a0ac-9c9d-4298-4146-fb7b1524d900/public"
        : "https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/b182ff22-04bd-4ccf-0b61-cf2450910e00/public"
    }) #070819`,
    header: "linear-gradient(269.14deg, #080810 0%, #11122b 100%)",
    selectInputFill: "#101225", // TODO: fix?
    toastSuccess: "#122431",
    withdrawalHighlight: "rgb(24, 30, 52)", // TODO: fix?
    toastError: "#231630",
    tableHeader: "#08081d",
    investorsIcon: "#65647E", // TODO: fix?
    inputTextFill: "#838b95", // TODO: fix? 1 usage
    headerMenuItemHover: "#1c1d35",
    secondaryBackground: "#0f0f25", // TODO: investigate
    dropdown2ndLevel: "rgb(25, 26, 48)", // TODO: fix?
    tableRow: "#13122566",
    modal: "#101225",
    activeTab: "#181B2F", // TODO: fix?
    greyedOutBorder: "#464a85", // TODO: fix?
    sliderMark: "#888999",
    sliderThumb: "#999ee0",
    manageServiceMenuHover: "#1b213d", // TODO: fix?
    buttonPrimary: "linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%)",
    input2fa: "#0f1124",
    input2faGradient: "linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)",
    input2faGradientBorder: "linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)",
    input: "linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%)",
    breakLineSignUp: "#b7bac7",
    mobileButtonsWrapper: "#060819",
    coinIconPlaceholder: "#324054",
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
