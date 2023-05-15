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
export { default as ZigSliderInput } from "components/inputs/ZigSliderInput";

// TODO: fix storybook & refactor
export { default as InputAmountAdvanced } from "components/inputs/InputAmountAdvanced";
export type { InputAmountAdvancedValueType } from "components/inputs/InputAmountAdvanced";

// Basic display components
export { Loader, CenteredLoader } from "./components/display/Loader";
export { default as ZigTypography } from "./components/display/ZigTypography";
export { default as ZigPriceLabel, ZigTablePriceLabel } from "./components/display/ZigPriceLabel";
export { default as Avatar } from "./components/display/Avatar";
export { default as ZigAlertMessage, ErrorMessage } from "./components/display/ZigAlertMessage";
export { default as Toaster } from "./components/display/Toaster";
export { default as ZigCopyText } from "./components/display/ZigCopyText";
export { default as ZigProgressBar } from "./components/display/ZigProgressBar";
export { default as ZigCoinIcon } from "components/display/ZigCoinIcon";
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
export { downloadTableCsv } from "./components/display/ZigTable/util";
export { default as DateLabel } from "./components/display/ZigTable/components/DateLabel"; // yes, this is used
export { default as ChangeIndicator } from "./components/display/ZigTable/components/ChangeIndicator"; // yes, this is used too
export { default as CoinLabel } from "./components/display/ZigTable/components/CoinLabel";

// Chart
export * from "./components/display/ZigChart";

// TODO: @Nikita9901 pls replace with mui and add stories
export { default as CheckBox } from "./components/inputs/CheckBox";

// Icons - for the love of God, we should not do this
// TODO: we have mui icons for a bloody reason
// UPD: apparently no, and we'll be using these ones ¯\_(ツ)_/¯
export { ReactComponent as ZigCloneIcon } from "assets/icons/clone-icon.svg";
export { ReactComponent as ZigRefreshIcon } from "assets/icons/refresh-icon.svg";
export { ReactComponent as ZigPencilIcon } from "assets/icons/pencil-icon.svg";
export { ReactComponent as ZigWhaleIcon } from "assets/icons/whale-icon.svg";
export { ReactComponent as ZigCloseIcon } from "assets/icons/close-icon.svg";
export { ReactComponent as ZigCopyIcon } from "assets/icons/copy-icon.svg";
export { ReactComponent as ZigOpenArrowIcon } from "assets/icons/open-arrow-icon.svg";
export { ReactComponent as ZigEyeOpenIcon } from "assets/icons/eye-open-icon.svg";
export { ReactComponent as ZigEyeClosedIcon } from "assets/icons/eye-closed-icon.svg";
export { ReactComponent as ZigOptionDotsIcon } from "assets/icons/option-dots-icon.svg";
export { ReactComponent as ZigArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";
export { ReactComponent as ZigArrowUpIcon } from "assets/icons/arrow-up-icon.svg";
export { ReactComponent as ZigArrowLeftIcon } from "assets/icons/arrow-left-icon.svg";
export { ReactComponent as ZigArrowRightIcon } from "assets/icons/arrow-right-icon.svg";
export { ReactComponent as ZigUserIcon } from "assets/icons/user-icon.svg";
export { ReactComponent as ZigCheckIcon } from "assets/icons/check-icon.svg";
export { ReactComponent as ZigLogoDiscordIcon } from "assets/icons/discord-logo-icon.svg";
export { ReactComponent as ZigPlusIcon } from "assets/icons/plus-icon.svg";
export { ReactComponent as ZigLogoLinkedInIcon } from "assets/icons/linkedin-logo-icon.svg";
export { ReactComponent as ZigLogoTwitterIcon } from "assets/icons/twitter-logo-icon.svg";
export { ReactComponent as ZigLogoMediumIcon } from "assets/icons/medium-logo-icon.svg";
export { ReactComponent as ZigLogoTelegramIcon } from "assets/icons/telegram-logo-icon.svg";
export { ReactComponent as ZigWalletIcon } from "assets/icons/wallet-icon.svg";
export { ReactComponent as ZigWalletGradientIcon } from "assets/icons/wallet-gradient-icon.svg";
export { ReactComponent as ZigListGradientIcon } from "assets/icons/list-gradient-icon.svg";
export { ReactComponent as ZigOptionHorizontalDotsIcon } from "assets/icons/horizontal-three-dots-icon.svg";
export { ReactComponent as ZigEditPenIcon } from "assets/icons/edit-pen-icon.svg";
export { ReactComponent as ZigSwapIcon } from "assets/icons/swap-icon.svg";
export { ReactComponent as ZigSwapVertIcon } from "assets/icons/swap-vert-icon.svg";
export { ReactComponent as ZigErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
export { ReactComponent as ZignalyIcon } from "assets/icons/coins/zignaly-coin.svg";
export { ReactComponent as ZignalyLogo } from "assets/images/zignaly-isotype.svg";
export { ReactComponent as ZigGlobeLanguages } from "assets/icons/globe-languages.svg";
export { ReactComponent as ZigTimeIcon } from "assets/icons/time-icon.svg";
export { ReactComponent as ZigSearchIcon } from "assets/icons/search-icon.svg";
export { ReactComponent as ZignalyExchangeIcon } from "assets/icons/zignaly-exchange-icon.svg";

// Utils
export { sortByValue, trimZeros } from "utils/numbers";
export { NiceScrollbar } from "utils/css";
export { getPrecisionForCoin, shortenNumber } from "components/display/ZigPriceLabel/util";

// TODO: please stop using this
export { styledIf } from "utils/styled";

// Layouts
// TODO: questionable, probably should move to ps2
export { MarginContainer, PageContainer } from "./components/styled";

// Navigation
// TODO: @cwagner22 pls fix/bring to proper shape
export { default as Header } from "./components/navigation/Header";
export { default as MenuDropDown } from "./components/navigation/MenuDropDown";
export { default as BrandImage } from "./components/navigation/Header/components/BrandImage";
export { HeaderLinksContainer } from "components/navigation/Header/styles";
