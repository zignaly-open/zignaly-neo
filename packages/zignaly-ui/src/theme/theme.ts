interface Theme {
  fontFamily: string[];
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

    contrasting: string;
  };
  backgrounds: Partial<
    Record<
      | "toastSuccess"
      | "toastError"
      | "secondaryBackground"
      | "sliderMark"
      | "tableRow"
      | "sliderThumb"
      | "tableHeader"
      | "buttonPrimary"
      | "loader"
      | "buttonPrimaryHover"
      | "header"
      | "input",
      string
    >
  >;
  boxShadows: Partial<Record<"tableHeader" | "header" | "button", string>>;
  mode: "dark" | "light";
  chart: Record<
    | "greenGradient"
    | "greenMiniGradient"
    | "redGradient"
    | "redMiniGradient"
    | "greenCard"
    | "redCard",
    string[]
  > &
    Record<"red" | "green", string>;
}

export default Theme;
