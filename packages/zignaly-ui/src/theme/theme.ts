interface Theme {
  palette: {
    neutral900: string;
    neutral800: string;
    neutral750: string;
    neutral700: string;
    neutral600: string;
    neutral500: string;
    neutral400: string;
    neutral200: string;
    neutral300: string;
    neutral175: string;
    neutral150: string;
    neutral100: string;
    neutral000: string;
    secondary: string;
    highlighted: string;
    redGraphOrError: string;
    greenGraph: string;
    links: string;
    yellow: string;
    red: string;

    almostWhite: string;
  };
  backgrounds: Partial<Record<"buttonPrimary" | "buttonPrimaryHover" | "header" | "input", string>>;
  mode: "dark" | "light";
}

export default Theme;
