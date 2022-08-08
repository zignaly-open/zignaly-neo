// Display
import Avatar from "./components/display/Avatar";
import ErrorMessage from "./components/display/ErrorMessage";
import Loader from "./components/display/Loader";
import Table from "./components/display/Table";
import ConnectionStateLabel from "./components/display/Table/components/ConnectionStateLabel";
import DateLabel from "./components/display/Table/components/DateLabel";
import PercentageIndicator from "./components/display/Table/components/PercentageIndicator";
import PriceLabel from "./components/display/Table/components/PriceLabel";
import Typography from "./components/display/Typography";
import ZigWalletIndicator from "./components/display/ZigWalletIndicator";
import CoinLabel from "./components/display/Table/components/CoinLabel";
import Toaster from "./components/display/Toaster";
import ProgressSlider from "./components/display/ProgressSlider";
import InvestSlider from "./components/display/InvestSlider";
import { ServiceName } from "./components/display/Table/components/ServiceName";
import { BalanceSummary } from "./components/display/Table/components/BalanceSummary";
import { AreaChart } from "./components/display/Charts";

// Inputs
import Button from "./components/inputs/Button";
import CheckBox from "./components/inputs/CheckBox";
import IconButton from "./components/inputs/IconButton";
import InputAmount from "./components/inputs/InputAmount";
import TextButton from "./components/inputs/TextButton";
import InputText from "./components/inputs/InputText";
import Select from "./components/inputs/Selector";
import InputCode from "./components/inputs/InputCode";
import { ButtonGroup } from "./components/styled";

// Layouts
import { MarginContainer, PageContainer } from "./components/styled";

// Modals
import EditInvestmentWithModal from "components/modals/EditInvestmentWithModal";
import MessageModal from "components/modals/MessageModal";
import AuthVerifyModal from "components/modals/AuthVerifyModal";
import MinBalanceModal from "components/modals/MinBalanceModal";
import DepositModal from "components/modals/MyAccount/DepositModal";
import WithdrawModal from "components/modals/MyAccount/WithdrawModal";
import ConnectWalletModal from "components/modals/ZigRaffle/ConnectWallet";

// Forms
import LoginForm from "./components/forms/LoginForm";

// Icons
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

// Navigation
import Header from "./components/navigation/Header";
import MenuDropDown from "./components/navigation/MenuDropDown";
import ZigsBalance from "./components/navigation/Header/components/ZigsBalance";
import BrandImage from "./components/navigation/Header/components/BrandImage";

// Utils
import { dark, light } from "theme";
import ThemeProvider from "utils/ThemeProvider";
import { customSort } from "utils/numbers";
import {
  createMarketPlaceTableBodyObject,
  createMarketPlaceTableHeader,
  createUserTableDataObject,
  createUserTableHeader,
} from "./components/display/Table/types";

export {
  /**
   * =-=-=-=-=-=-=-=
   *   Components
   * =-=-=-=-=-=-=-=
   */
  // Display
  ServiceName,
  BalanceSummary,
  AreaChart,
  Avatar,
  Loader,
  Table,
  createUserTableHeader,
  createUserTableDataObject,
  createMarketPlaceTableBodyObject,
  createMarketPlaceTableHeader,
  ConnectionStateLabel,
  DateLabel,
  PriceLabel,
  PercentageIndicator,
  Typography,
  ErrorMessage,
  ZigWalletIndicator,
  CoinLabel,
  ProgressSlider,
  InvestSlider,
  Toaster,
  // Inputs
  Button,
  CheckBox,
  IconButton,
  InputAmount,
  TextButton,
  InputText,
  Select,
  ButtonGroup,
  InputCode,
  // Navigation
  Header,
  BrandImage,
  ZigsBalance,
  MenuDropDown,
  PageContainer,
  MarginContainer,
  // Modals
  ConnectWalletModal,
  EditInvestmentWithModal,
  MessageModal,
  AuthVerifyModal,
  DepositModal,
  WithdrawModal,
  MinBalanceModal,
  // Forms
  LoginForm,
  /**
   * =-=-=-=-=-=-=-=
   *     Utils
   * =-=-=-=-=-=-=-=
   */
  ThemeProvider,
  dark,
  light,
  customSort,
};
