import { ThemeStyledComponents } from "../types";

const dark: ThemeStyledComponents = {
  mode: "dark",
  fontFamily: ["Avenir Next", "Roboto", "Helvetica", "Arial", "sans-serif"],
  // having this key is important
  // without it overriding would not work
  fontFamilyH1H6: undefined,
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
    darkGreen: "#156747",
    lightGrey: "#9ca3af",
    paleBlue: "#999fe1",
  },
  backgrounds: {
    body: `url(https://imagedelivery.net/qNg0fDlw9b2DximxcnB4cA/4048a0ac-9c9d-4298-4146-fb7b1524d900/public) #070819`,
    header: "linear-gradient(269.14deg, #080810 0%, #11122b 100%)",
    selectInputFill: "#101225", // TODO: fix?
    toastSuccess: "#122431",
    withdrawalHighlight: "rgb(24, 30, 52)", // TODO: fix?
    toastError: "#231630",
    tableHeader: "#08081d",
    investorsIcon: "#65647E", // TODO: fix?
    headerMenuItemHover: "#1c1d35",
    secondaryBackground: "#0f0f25", // TODO: investigate
    dropdown2ndLevel: "rgb(25, 26, 48)", // TODO: fix?
    tableRow: "#13122566",
    modal: "#101225",
    activeTab: "#181B2F", // TODO: fix?
    greyedOutBorder: "#464a85", // TODO: fix?
    manageServiceMenuHover: "#1b213d", // TODO: fix?
    buttonPrimary: "linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%)",
    input2fa: "#0f1124",
    input2faGradient: "linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%)",
    breakLineSignUp: "#b7bac7",
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
  },
  zscore: {
    ring: {
      profits: {
        gradient: ["#2bc5f2", "#19dcd1", "#0ceaae"],
        icon: "#29cdbb",
      },
      risk: {
        gradient: ["#4c18b3", "#5352D8", "#526BDD"],
      },
      service: {
        gradient: ["#6e0a83", "#d94097", "#f24196"],
        icon: "#734c9a",
      },
      balanced: {
        gradient: ["#46835e", "#7fce87", "#88c489"],
        icon: "#a2b88d",
      },
    },
    bar: {
      profits: "linear-gradient(to right, #0e272e, #2acbfe 47%, #0ceaae 88%)",
      risk: "linear-gradient(to right, #210f45, #5533cf, #50a9ee)",
      service: "linear-gradient(to right, #1f1030, #6d0b82 42%, #dd4393 76%, #f24196)",
      balanced: "linear-gradient(to right, #10341d, #46995c 42%, #76dd88 76%, #88c489)",
    },
  },
  imageColorOverride: undefined,
};

export default dark;
