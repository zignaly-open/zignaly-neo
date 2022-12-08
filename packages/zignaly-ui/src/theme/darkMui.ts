import { createTheme } from "@mui/material/styles";
import dark from "./dark";

const darkMui = createTheme({
  palette: {
    ...dark,
    mode: "dark",

    primary: {
      main: dark.highlighted,
    },

    secondary: {
      dark: "#191927",
      main: "#656565",
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Avenir Next", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(16, 18, 37)",
          color: dark.neutral200,
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: `
          & > .MuiButton-root {
          border-radius: 0;
            &:first-child {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            &:last-child {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
        `,
      },
    },
    MuiButton: {
      // variants: [
      //   {
      //     props: { variant: "dashed" },
      //     style: {
      //       textTransform: "none",
      //       border: `2px dashed #f00`,
      //     },
      //   },
      // ],
      styleOverrides: {
        root: {},
        sizeLarge: {
          minHeight: "48px",
          minWidth: "110px",
        },
        sizeMedium: {
          minHeight: "36px",
          minWidth: "76px",
        },
        sizeSmall: {
          minHeight: "30px",
          minWidth: "76px",
        },
        contained: {
          background: "linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%)",
          boxShadow: "0px 12px 16px -8px rgba(25, 25, 39, 0.36)",
          transition: "all 0.3s linear",
          "&:hover": {
            background: "linear-gradient(rgba(20, 156, 173, 0.64),rgba(69, 64, 193, 0.64))",
          },
        },
        outlined: {
          borderColor: dark.neutral600,
          color: dark.neutral300,
          transition: "all 0.2s linear",
          "&:hover": {
            // background: "transparent",
            color: dark.neutral000,
            borderColor: dark.neutral400,
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "bigNumber" },
          style: {
            fontSize: "26px",
            lineHeight: "40px",
            color: dark.neutral000,
            fontWeight: "500",
          },
        },
      ],
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
      styleOverrides: {
        root: {
          letterSpacing: "0.55px",
        },
        h1: {
          fontSize: "22px",
          lineHeight: "36px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        h2: {
          fontSize: "18px",
          lineHeight: "28px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        h3: {
          fontSize: "15px",
          lineHeight: "24px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        h4: {
          fontSize: "13px",
          lineHeight: "20px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        h5: {
          fontSize: "11px",
          lineHeight: "16px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        h6: {
          fontSize: "10px",
          lineHeight: "14px",
          color: dark.neutral000,
          fontWeight: "500",
        },
        subtitle1: {
          fontSize: "15px",
          lineHeight: "24px",
          color: dark.neutral200,
        },
        subtitle2: {
          fontSize: "13px",
          lineHeight: "20px",
          color: dark.neutral200,
        },
        body1: {
          fontSize: "15px",
          lineHeight: "24px",
          color: dark.neutral200,
        },
        body2: {
          fontSize: "13px",
          lineHeight: "20px",
          color: dark.neutral200,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.links,
        }),
      },
    },
  },
});

export default darkMui;
