// Core
export { ThemeProvider as ThemeProviderMui } from "@mui/material";
export { default as ThemeProvider } from "utils/ThemeProvider";
export * from "./theme";

// Basic inputs <3
export { default as ZigButton, ZigButtonGroup } from "./components/inputs/ZigButton";
export { default as ZigButtonGroupInput } from "./components/inputs/ZigButtonGroupInput";
export { default as ZigInput } from "./components/inputs/ZigInput";
export { default as ZigAutocomplete } from "./components/inputs/ZigAutocomplete";
export { default as ZigSelect } from "./components/inputs/ZigSelect";
export { default as InputAmountAdvanced } from "components/inputs/InputAmountAdvanced";
export { default as SliderInput } from "components/inputs/SliderInput";

// Basic display components
export { default as ZigTypography } from "./components/display/ZigTypography";
export { default as ZigPriceLabel, ZigTablePriceLabel } from "./components/display/ZigPriceLabel";
export { default as Avatar } from "./components/display/Avatar";
export { default as ErrorMessage } from "./components/display/ErrorMessage";
export { default as Loader } from "./components/display/Loader";
export { default as Toaster } from "./components/display/Toaster";
export { default as ProgressSlider } from "./components/display/ProgressSlider";
export { default as ZigCoinIcon } from "components/display/ZigCoinIcon";
export { default as ZignalyQRCode } from "./components/display/ZignalyQRCode";
export { default as ZigTabs, ZigTab, ZigTabPanel } from "./components/navigation/ZigTabs";

// Table
export { createColumnHelper } from "@tanstack/react-table";
export type { ColumnDef } from "@tanstack/react-table";
export { default as ZigTable } from "./components/display/ZigTable";
export { default as DateLabel } from "./components/display/Table/components/DateLabel"; // yes, this is used
export { default as PercentageIndicator } from "./components/display/Table/components/PercentageIndicator"; // yes, this is used too
export { default as CoinLabel } from "./components/display/Table/components/CoinLabel";

// TODO: Layouts - questionable, probably shoudl deprecate
export { MarginContainer, PageContainer } from "./components/styled";

// Chart
export * from "./components/display/ZigChart";

// TODO: deprecate
export {
  default as PriceLabel,
  UsdPriceLabel,
} from "./components/display/Table/components/PriceLabel";
export { default as DropDown } from "./components/display/DropDown";
export { default as Typography } from "./components/display/Typography";
export { default as CoinIcon } from "components/display/CoinIcon";

// TODO: deprecate - Inputs
export { default as Button } from "./components/inputs/Button";
export { default as CheckBox } from "./components/inputs/CheckBox";
export { default as IconButton } from "./components/inputs/IconButton";
export { default as TextButton } from "./components/inputs/TextButton";
export { default as InputText } from "./components/inputs/InputText";
export { default as InputCode } from "./components/inputs/InputCode";
export { ButtonGroup, ValueIndicator } from "./components/styled";

// Icons - for the love of God, we should not do this
// TODO: we have mui icons for a bloody reason
export { ReactComponent as CloneIcon } from "assets/icons/clone-icon.svg";
export { ReactComponent as RefreshIcon } from "assets/icons/refresh-icon.svg";
export { ReactComponent as PencilIcon } from "assets/icons/pencil-icon.svg";
export { ReactComponent as WhaleIcon } from "assets/icons/whale-icon.svg";
export { ReactComponent as CloseIcon } from "assets/icons/close-icon.svg";
export { ReactComponent as CopyIcon } from "assets/icons/copy-icon.svg";
export { ReactComponent as OpenArrowIcon } from "assets/icons/open-arrow-icon.svg";
export { ReactComponent as EyeOpenIcon } from "assets/icons/eye-open-icon.svg";
export { ReactComponent as EyeClosedIcon } from "assets/icons/eye-closed-icon.svg";
export { ReactComponent as OptionDotsIcon } from "assets/icons/option-dots-icon.svg";
export { ReactComponent as ArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";
export { ReactComponent as ArrowUpIcon } from "assets/icons/arrow-up-icon.svg";
export { ReactComponent as ArrowLeftIcon } from "assets/icons/arrow-left-icon.svg";
export { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right-icon.svg";
export { ReactComponent as UserIcon } from "assets/icons/user-icon.svg";
export { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
export { ReactComponent as LogoDiscordIcon } from "assets/icons/discord-logo-icon.svg";
export { ReactComponent as PlusIcon } from "assets/icons/plus-icon.svg";
export { ReactComponent as LogoLinkedInIcon } from "assets/icons/linkedin-logo-icon.svg";
export { ReactComponent as LogoTwitterIcon } from "assets/icons/twitter-logo-icon.svg";
export { ReactComponent as LogoMediumIcon } from "assets/icons/medium-logo-icon.svg";
export { ReactComponent as LogoTelegramIcon } from "assets/icons/telegram-logo-icon.svg";
export { ReactComponent as WalletIcon } from "assets/icons/wallet-icon.svg";
export { ReactComponent as WalletGradientIcon } from "assets/icons/wallet-gradient-icon.svg";
export { ReactComponent as ListGradientIcon } from "assets/icons/list-gradient-icon.svg";
export { ReactComponent as OptionHorizontalDotsIcon } from "assets/icons/horizontal-three-dots-icon.svg";
export { ReactComponent as EditPenIcon } from "assets/icons/edit-pen-icon.svg";
export { ReactComponent as SwapIcon } from "assets/icons/swap-icon.svg";
export { ReactComponent as SwapVertIcon } from "assets/icons/swap-vert-icon.svg";
export { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
export { ReactComponent as ZignalyIcon } from "assets/icons/coins/zignaly-coin.svg";
export { ReactComponent as ZignalyLogo } from "assets/images/zignaly-isotype.svg";
export { ReactComponent as GlobeLanguages } from "assets/icons/globe-languages.svg";
export { ReactComponent as TimeIcon } from "assets/icons/time-icon.svg";
export { ReactComponent as SearchIcon } from "assets/icons/search-icon.svg";
export { ReactComponent as ZignalyExchangeIcon } from "assets/icons/zignaly-exchange-icon.svg";

// Navigation
export { default as Header } from "./components/navigation/Header";
export { default as MenuDropDown } from "./components/navigation/MenuDropDown";
export { default as BrandImage } from "./components/navigation/Header/components/BrandImage";

// Utils
export { sortByValue } from "utils/numbers";
export { NiceScrollbar } from "utils/css";
export { styledIf } from "utils/styled";
export { HeaderLinksContainer } from "components/navigation/Header/styles";

export const test = "shit";
