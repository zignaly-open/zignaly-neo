import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ThemeExport, ThemeStyledComponents, ThemeStyledComponentsOverrides } from "./types";
import { DeepPartial } from "react-hook-form";
import { linearProgressClasses } from "@mui/material";

const {
  palette: { augmentColor },
} = createTheme();
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const createMuiTheme = ({
  palette,
  mode,
  chart,
  zscore,
  backgrounds,
  boxShadows,
  fontFamily,
  fontFamilyH1H6,
  imageColorOverride,
}: ThemeStyledComponents) =>
  createTheme({
    palette: {
      ...palette,
      mode,

      primary: createColor(palette.highlighted),
      secondary: createColor(palette.neutral300),
      danger: createColor(palette.redGraphOrError),
      success: createColor(palette.greenGraph),

      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,

      backgrounds,
      boxShadows,
      chart,
      zscore,
      imageColorOverride,
    },
    typography: {
      fontFamily: fontFamily.join(","),
      ...(fontFamilyH1H6 && {
        h1: { fontFamily: fontFamilyH1H6.join(",") },
        h2: { fontFamily: fontFamilyH1H6.join(",") },
        h3: { fontFamily: fontFamilyH1H6.join(",") },
        h4: { fontFamily: fontFamilyH1H6.join(",") },
        h5: { fontFamily: fontFamilyH1H6.join(",") },
        h6: { fontFamily: fontFamilyH1H6.join(",") },
      }),
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.neutral600}`,
            background: palette.neutral800,
            color: palette.neutral200,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: `
          border: 1px solid ${palette.neutral600};
          min-height: 60px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          background: ${backgrounds.selectInputFill};
          transition: border-color 0.2s;
          
          &.Mui-disabled {
            cursor: not-allowed;
            border-color: ${palette.neutral700};
          }
      
          &.Mui-focused,
          &:hover {
            border-color: ${palette.neutral400};
            &.Mui-disabled {
              border-color: ${palette.neutral700};
            }
          }
          
          &.Mui-error,
          &.Mui-error:hover,
          &.Mui-error.Mui-focused {
            border-color: ${palette.redGraphOrError};
      
            .MuiInputLabel-root {
              color: ${palette.neutral200};
            }
          }          
          
          .MuiInputAdornment-root {
            .MuiSvgIcon-root {
              width: 18px;
              height: 18px;
            }
          }
          
          .MuiInput-input {
            border: none;
            color: ${palette.neutral100} !important;
            outline: none;
            font-weight: 400;
            font-size: 16px;
            &.MuiInputBase-inputSizeSmall{
              font-size: 11px;
              padding: 0;
              line-height: 14px;
            }
            line-height: 20px;
            letter-spacing: 0.55px;
            width: 100%;
            box-shadow: none !important;
            resize: none;
            -webkit-text-fill-color: ${palette.neutral300} !important;
            // 1Password autofill fix
            background: linear-gradient(90deg,${backgrounds.selectInputFill} 0%,${backgrounds.selectInputFill} 100%);
          }
          
          .MuiInput-input {
            &::placeholder {
              -webkit-text-fill-color: ${palette.neutral400} !important;
            }
        
            &.Mui-disabled {
              cursor: not-allowed;
              opacity: 0.67;
              color: ${palette.neutral100} !important;
            }
        
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
           
        `,
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            "&": `
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
          
          & > span .MuiButton-root {
            border-radius: 0 !important;
          }
          
          & > span:first-child .MuiButton-root {
            border-radius: 4px 0 0 4px !important;
          }
          
          & > span:last-child .MuiButton-root {
            border-radius: 0 4px 4px 0 !important;
          }
        `,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: `
            background: ${backgrounds.header};
            box-shadow: 0 4px 8px ${boxShadows.header};
            display: flex;
            align-items: center;
            flex-direction: row;
            &, .MuiToolbar-root {
              min-height: 52px;
            }
            border: none;
            z-index: 12;
          `,
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: "rgb(19,28,53)",
            borderRadius: 9,
            height: 18,

            "&:before": {
              content: "''",
              position: "absolute",
              zIndex: 2,
              borderRadius: 9,
              padding: "3px",
              background: "linear-gradient(90deg, #7319DB, #05EAC1)",
              mask: "linear-gradient(#fff 0 0, #fff 0 0), content-box, linear-gradient(#fff 0 0, #fff 0 0)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
              outline: "solid 2px rgb(19,28,53)",
              outlineOffset: "-4px",
              inset: "-1px",
            },

            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 7,
              inset: "2px",
              width: "calc(100% - 4px)",
              backgroundImage: "linear-gradient(90deg, #7319DB, #05EAC1)",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: palette.neutral300,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            "&&": {
              // Fix for variant='text' causing endIcon to be wrapped in a new line on firefox
              display: "inline-flex",
            },
            ".MuiButton-startIcon, .MuiButton-endIcon": {
              lineHeight: 1,
              verticalAlign: "middle",
            },
          },
          plain: {
            padding: "0 !important",
            ".MuiSvgIcon-root": {
              fill: palette.neutral300,
              transition: "all .2s",
            },

            "&:hover": {
              background: "none",
            },

            "&:hover .MuiSvgIcon-root": {
              fill: palette.neutral100,
            },

            "&.Mui-disabled:hover .MuiSvgIcon-root": {
              fill: palette.neutral300,
            },

            "&.Mui-disabled": {
              opacity: 0.33,
              cursor: "not-allowed",
            },
          },
          sizeXlarge: {
            minHeight: "60px",
            minWidth: "127px",
            fontSize: "16px",
            lineHeight: "20px",
            letterSpacing: "1.1px",
            fontWeight: 600,
            padding: "10px 36px",
            ".MuiButton-startIcon": {
              marginLeft: "-6px",
            },
          },
          sizeLarge: {
            minHeight: "48px",
            minWidth: "110px",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            paddingLeft: "30px",
            letterSpacing: "1.1px",
            paddingRight: "30px",
            ".MuiButton-startIcon": {
              marginLeft: "-4px",
            },
          },
          sizeMedium: {
            minHeight: "36px",
            paddingTop: "6px",
            paddingBottom: "6px",
            letterSpacing: "0.55px",
            minWidth: "76px",
            fontSize: "11px",
            paddingLeft: "18px",
            paddingRight: "18px",
          },
          sizeSmall: {
            minHeight: "30px",
            minWidth: "76px",
            padding: "4px 18px",
            letterSpacing: "0.55px",
            fontSize: "11px",
          },
          containedSizeSmall: {
            letterSpacing: "1.1px",
          },
          containedSizeMedium: {
            letterSpacing: "1.1px",
          },
          text: {
            color: palette.links,
            fontWeight: "400 !important",
            display: "inline",
            padding: "0 2px !important",
            borderRadius: "2px",
            fontSize: "13px !important",
            minWidth: "0 !important",
            verticalAlign: "baseline",
            minHeight: "0px !important",
            ".MuiLoadingButton-loadingIndicatorCenter": {
              transform: "translate(-50%, 50%)",
              marginTop: "-4px",
            },
            "&:hover": {
              background: "transparent",
              textDecoration: "underline",
            },
            ".MuiButton-startIcon": {
              marginRight: "5px",
            },
            ".MuiButton-endIcon": {
              marginLeft: "5px",
            },
            ".MuiButton-startIcon, .MuiButton-endIcon": {
              position: "relative",
              display: "inline",
              top: "-1px",
              ".MuiSvgIcon-root": {
                fill: palette.neutral300,
                verticalAlign: "middle",
              },
            },
          },
          contained: {
            "&, &:hover": {
              boxShadow: `0px 12px 16px -8px ${boxShadows.button}`,
            },
            transition: "all 0.3s linear",
            fontWeight: 600,
            letterSpacing: "1.1px",
            textTransform: "uppercase",
            ".MuiTypography-root": {
              textTransform: "none",
            },
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: 0,
              zIndex: -1,
              height: "100%",
              background: "rgba(0, 0, 0, .1)",
              transition: "width 0.5s",
            },
            "&:hover::before, &.MuiButton-active::before": {
              width: "100%",
            },
            "&.Mui-disabled": {
              opacity: 0.33,
            },
          },
          containedPrimary: {
            ".MuiTypography-root": {
              textTransform: "none",
            },
            color: palette.neutral000,
            background: backgrounds.buttonPrimary,
            ".MuiButton-startIcon": {
              color: palette.neutral175,
              "& svg.zig-icon": {
                fill: palette.neutral175,
              },
            },
          },
          outlined: {
            transition: "all 0.2s linear",
          },
          outlinedSecondary: {
            borderColor: palette.neutral600,
            color: palette.neutral300,
            "&.MuiButton-sizeLarge, &.MuiButton-sizeXlarge": {
              textTransform: "uppercase",
              ".MuiTypography-root": {
                textTransform: "none",
              },
            },
            "&:hover, &.MuiButton-active": {
              color: palette.neutral000,
              borderColor: palette.neutral400,
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
              color: palette.neutral100,
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
            body1: "span",
            body2: "span",
            caption: "span",
          },
        },
        styleOverrides: {
          root: {
            letterSpacing: "0.55px",
            color: palette.neutral100,
          },
          bigNumber: {
            fontSize: "26px",
            lineHeight: "40px",
            fontWeight: "500",
          },
          h1: {
            fontSize: "22px",
            lineHeight: "36px",
            marginBottom: "6px",
            fontWeight: "500",
          },
          h2: {
            fontSize: "18px",
            lineHeight: "28px",
            fontWeight: "500",
          },
          h3: {
            fontSize: "15px",
            lineHeight: "24px",
            fontWeight: "500",
          },
          h4: {
            fontSize: "13px",
            lineHeight: "20px",
            fontWeight: "500",
          },
          h5: {
            fontSize: "11px",
            lineHeight: "16px",
            fontWeight: "500",
          },
          caption: {
            fontSize: "11px",
            lineHeight: "16px",
            color: palette.neutral200,
          },
          body1: {
            fontSize: "15px",
            lineHeight: "24px",
            color: palette.neutral200,
          },
          body2: {
            fontSize: "13px",
            lineHeight: "20px",
            color: palette.neutral300,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            color: palette.links,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          rail: {
            backgroundColor: palette.neutral500,
            opacity: 1,
          },
          mark: {
            color: palette.neutral300,
            backgroundColor: "currentcolor",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
          },
          thumb: {
            color: palette.paleBlue,
            width: "17px",
            height: "17px",
          },
          track: {
            color: palette.paleBlue,
          },
        },
      },
    },
  } as ThemeOptions);

type StylePart = Record<string, unknown>;
const overrideTheme = <U>(
  base: Record<string | number, U>,
  override?: DeepPartial<Record<string | number, U>>,
) => {
  if (!override) return base;
  const result = {} as StylePart;
  for (const k of Object.keys(base)) {
    if (typeof base[k] === "object" && !Array.isArray(base[k])) {
      result[k] = overrideTheme(
        base[k] as Record<string | number, U>,
        override[k] as DeepPartial<Record<string | number, U>>,
      );
    } else {
      result[k] = override[k] ?? base[k];
    }
  }
  return result;
};

export const getMuiAndStyledThemes = (
  baseTheme: ThemeStyledComponents,
  overrides?: ThemeStyledComponentsOverrides[],
): ThemeExport => {
  let overriden = baseTheme;

  for (const k of overrides || []) {
    overriden = overrideTheme(overriden, k || {}) as ThemeStyledComponents;
  }

  return {
    legacyStyledComponentsDoNotUse: overriden,
    mui: createMuiTheme(overriden),
  };
};
