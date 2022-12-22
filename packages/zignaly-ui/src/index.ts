import Avatar from "./components/display/Avatar";
import ErrorMessage from "./components/display/ErrorMessage";
import Loader from "./components/display/Loader";
import Table from "./components/display/Table";
import DateLabel from "./components/display/Table/components/DateLabel";
import PercentageIndicator from "./components/display/Table/components/PercentageIndicator";
import PriceLabel, { UsdPriceLabel } from "./components/display/Table/components/PriceLabel";
import Typography from "./components/display/Typography";
import ZigWalletIndicator from "./components/display/ZigWalletIndicator";
export { default as CoinLabel } from "./components/display/Table/components/CoinLabel";
import Toaster from "./components/display/Toaster";
import ProgressSlider from "./components/display/ProgressSlider";
import InvestSlider from "./components/display/InvestSlider";

export * from "./components/display/ZigChart";
import DropDown from "./components/display/DropDown";

export { default as ZignalyQRCode } from "./components/display/ZignalyQRCode";

export { ThemeProvider as ThemeProviderMui } from "@mui/material";

// Inputs
import Button from "./components/inputs/Button";
import CheckBox from "./components/inputs/CheckBox";
import IconButton from "./components/inputs/IconButton";
import InputAmount from "./components/inputs/InputAmount";
import TextButton from "./components/inputs/TextButton";
import InputText from "./components/inputs/InputText";
import Select from "./components/inputs/Selector";
import InputCode from "./components/inputs/InputCode";
import { ButtonGroup, ValueIndicator } from "./components/styled";

// Layouts
import { MarginContainer, PageContainer } from "./components/styled";

// Modals
import MessageModal from "components/modals/MessageModal";
import AuthVerifyModal from "components/modals/AuthVerifyModal";
import MinBalanceModal from "components/modals/MinBalanceModal";
import DepositModal from "components/modals/MyAccount/DepositModal";
import WithdrawModal from "components/modals/MyAccount/WithdrawModal";
import ConnectWalletModal from "components/modals/ZigRaffle/ConnectWallet";

// Icons
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
export { ReactComponent as OptionHorizontalDotsIcon } from "assets/icons/horizontal-three-dots-icon.svg";
export { ReactComponent as EditPenIcon } from "assets/icons/edit-pen-icon.svg";
export { ReactComponent as SwapIcon } from "assets/icons/swap-icon.svg";
export { ReactComponent as SwapVertIcon } from "assets/icons/swap-vert-icon.svg";
export { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
export { ReactComponent as ZignalyIcon } from "assets/icons/coins/zignaly-coin.svg";
export { ReactComponent as GlobeLanguages } from "assets/icons/globe-languages.svg";
export { ReactComponent as TimeIcon } from "assets/icons/time-icon.svg";
export { ReactComponent as SearchIcon } from "assets/icons/search-icon.svg";

// Navigation
import Header from "./components/navigation/Header";
import MenuDropDown from "./components/navigation/MenuDropDown";
import ZigsBalance from "./components/navigation/Header/components/ZigsBalance";
import BrandImage from "./components/navigation/Header/components/BrandImage";

export * from "./theme";
export { default as ZigButton } from "./components/inputs/ZigButton";
export { default as ZigInput } from "./components/inputs/ZigInput";
export { default as ZigTypography } from "./components/display/ZigTypography";
export { default as ZigPriceLabel } from "./components/display/ZigPriceLabel";
export { default as ZigAutocomplete } from "./components/inputs/ZigAutocomplete";
export { default as ZigSelect } from "./components/inputs/ZigSelect";
import ThemeProvider from "utils/ThemeProvider";
import { sortByValue } from "utils/numbers";
import { HeaderLinksContainer } from "components/navigation/Header/styles";
import { styledIf } from "utils/styled";
import CoinIcon from "components/display/CoinIcon";
import SliderInput from "components/inputs/SliderInput";
import InputAmountAdvanced from "components/inputs/InputAmountAdvanced";
import { NiceScrollbar } from "utils/css";
export { SelectSizes } from "components/inputs/Selector/types";

export {
  /**
   * =-=-=-=-=-=-=-=
   *   Components
   * =-=-=-=-=-=-=-=
   */
  Avatar,
  Loader,
  Table,
  DateLabel,
  PriceLabel,
  UsdPriceLabel,
  ValueIndicator,
  PercentageIndicator,
  NiceScrollbar,
  Typography,
  SliderInput,
  CoinIcon,
  ErrorMessage,
  ZigWalletIndicator,
  ProgressSlider,
  InvestSlider,
  Toaster,
  DropDown,
  // Inputs
  Button,
  CheckBox,
  IconButton,
  InputAmount,
  InputAmountAdvanced,
  TextButton,
  InputText,
  Select,
  ButtonGroup,
  InputCode,
  // Navigation
  Header,
  BrandImage,
  ZigsBalance,
  HeaderLinksContainer,
  MenuDropDown,
  PageContainer,
  MarginContainer,
  // Modals
  ConnectWalletModal,
  MessageModal,
  AuthVerifyModal,
  DepositModal,
  WithdrawModal,
  MinBalanceModal,
  /**
   * =-=-=-=-=-=-=-=
   *     Utils
   * =-=-=-=-=-=-=-=
   */
  ThemeProvider,
  sortByValue,
  styledIf,
};
