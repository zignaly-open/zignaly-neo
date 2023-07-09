import Theme from "./theme";

const dark: Theme = {
  mode: "dark",
  palette: {
    neutral800: "#06061A",
    neutral750: "#12152c",
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
    almostWhite: "#F3F4F6",
  },
  backgrounds: {
    header: "linear-gradient(269.14deg, #080810 0%, #11122b 100%)",
    buttonPrimary: "linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%)",
    input: "linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%)",
  },
};

const ugly: Theme = {
  mode: "light",
  palette: {
    neutral800: "#fba9a5",
    neutral750: "#fa7f79",
    neutral700: "#F75850",
    neutral600: "#f55047",
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
    almostWhite: "#F3F4F6",
  },
  backgrounds: {
    header: "linear-gradient(269.14deg, #ffcccc 0%, #eebbbb 100%)",
    buttonPrimary: "linear-gradient(289.8deg, #f99 0%, #f9f 100%)",
    buttonPrimaryHover: "linear-gradient(#fcc,#fcf)",
    input: "linear-gradient(90deg, rgb(255 230 200) 0%, rgb(255 200 200) 100%)",
  },
};

// export default dark;
export default ugly;
