// Core
export { ThemeProvider as ThemeProviderMui } from "@mui/material";
export { default as ThemeProvider } from "utils/ThemeProvider";
export * from "./theme";

export { ReactComponent as ZignalyLogotype } from "assets/images/zignaly-logotype.svg";

// Basic inputs <3
export { default as ZigButton, ZigButtonGroup } from "./components/inputs/ZigButton";
export type { ZigButtonProps } from "./components/inputs/ZigButton";
export { default as ZigButtonGroupInput } from "./components/inputs/ZigButtonGroupInput";
export {
  default as ZigInput,
  ZigInputInteractiveAdornmentStyle,
} from "./components/inputs/ZigInput";
export { default as ZigAutocomplete } from "./components/inputs/ZigAutocomplete";
export { default as ZigSelect } from "./components/inputs/ZigSelect";
export { default as ZigLink } from "./components/inputs/ZigLink";
export { default as InputCode } from "./components/inputs/InputCode";
export { default as ZigSlider } from "./components/inputs/ZigSlider";
export { default as ZigSliderInput } from "./components/inputs/ZigSliderInput";
export { default as ZigSwitch } from "./components/inputs/ZigSwitch";

export { default as ZigSearch } from "./components/filters/ZigSearch";

// TODO: fix storybook & refactor
export { default as InputAmountAdvanced } from "./components/inputs/InputAmountAdvanced";
export type { InputAmountAdvancedValueType } from "./components/inputs/InputAmountAdvanced";

export { default as ZigInputAmount } from "./components/inputs/ZigInputAmount";

// Basic display components
export { Loader, CenteredLoader } from "./components/display/Loader";
export { default as ZigTypography } from "./components/display/ZigTypography";
export { default as ZigPriceLabel, ZigTablePriceLabel } from "./components/display/ZigPriceLabel";
export { default as Avatar } from "./components/display/Avatar";
export { default as ZigAlertMessage, ErrorMessage } from "./components/display/ZigAlertMessage";
export {
  default as ZigModalContainer,
  ZigModalActions,
  ZigModalForm,
} from "./components/display/ZigModalContainer";
export { default as Toaster } from "./components/display/Toaster";
export { default as ZigCopyText } from "./components/display/ZigCopyText";
export { default as ZigProgressBar } from "./components/display/ZigProgressBar";
export { default as ZigCoinIcon } from "./components/display/ZigCoinIcon";
export { default as ZigQrCode } from "./components/display/ZigQrCode";
export { default as ZigTabs, ZigTab, ZigTabPanel } from "./components/navigation/ZigTabs";
export { default as ZigDropdown } from "./components/display/ZigDropdown";
export type {
  ZigDropdownHandleType,
  ZigDropdownProps,
  ZigDropdownOptionType,
} from "./components/display/ZigDropdown";

// Table
export { createColumnHelper } from "@tanstack/react-table";
export type { ColumnDef } from "@tanstack/react-table";
export { default as ZigTable } from "./components/display/ZigTable";
export type { ZigTableQueryRef } from "./components/display/ZigTable/types";
export { downloadTableCsv } from "./components/display/ZigTable/util";
export { default as DateLabel } from "./components/display/ZigTable/components/DateLabel"; // yes, this is used
export { default as ChangeIndicator } from "./components/display/ZigTable/components/ChangeIndicator"; // yes, this is used too
export { default as CoinLabel } from "./components/display/ZigTable/components/CoinLabel";

// Chart
export * from "./components/display/ZigChart";

// TODO: @Nikita9901 pls replace with mui and add stories
export { default as CheckBox } from "./components/inputs/CheckBox";

// Icons
export * from "./icons";

// Utils
export { sortByValue, trimZeros } from "utils/numbers";
export { NiceScrollbar } from "utils/css";
export { getPrecisionForCoin, shortenNumber } from "./components/display/ZigPriceLabel/util";

// TODO: please stop using this
export { styledIf, withAttrs } from "utils/styled";

// Layouts
// TODO: questionable, probably should move to ps2
export { MarginContainer, PageContainer } from "./components/styled";

// Navigation
// TODO: @cwagner22 pls fix/bring to proper shape
export { default as Header } from "./components/navigation/Header";
export { default as MenuDropDown } from "./components/navigation/MenuDropDown";
export { default as BrandImage } from "./components/navigation/Header/components/BrandImage";
export { HeaderLinksContainer } from "./components/navigation/Header/styles";

// hooks
export { useToast, showZigToast, ToastContainer } from "./hooks/useToast";
export { getGlobalAppStyle } from "./theme/globalAppStyle";
export { fixSearchParams } from "./utils/search";

export * as fonts from "./theme/fonts";
