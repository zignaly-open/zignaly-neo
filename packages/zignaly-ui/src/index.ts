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
import ProgressSlider from "components/display/ProgressSlider";
import InvestSlider from "components/display/InvestSlider";
import { ServiceName } from "components/display/Table/components/ServiceName";
import { BalanceSummary } from "components/display/Table/components/BalanceSummary";
import { AreaChart } from "components/display/Charts";

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
import EditInvestmentWithModal from "./components/modals/EditInvestmentWithModal";
import MessageModal from "./components/modals/MessageModal";
import AuthVerifyModal from "./components/modals/AuthVerifyModal";
import MinBalanceModal from "./components/modals/MinBalanceModal";
import DepositModal from "./components/modals/MyAccount/DepositModal";
import WithdrawModal from "./components/modals/MyAccount/WithdrawModal";
import ModalContainer from "components/modals/ModalContainer";
import ConnectWalletModal from "components/modals/ZigRaffle/ConnectWallet";

// Forms
import LoginForm from "./components/forms/LoginForm";

// Icons
import CloseIcon from "./assets/icons/close-icon.svg";
import CopyIcon from "./assets/icons/copy-icon.svg";
import OpenArrowIcon from "./assets/icons/open-arrow-icon.svg";
import EyeOpenIcon from "./assets/icons/eye-open-icon.svg";
import EyeClosedIcon from "./assets/icons/eye-closed-icon.svg";
import OptionDotsIcon from "./assets/icons/option-dots-icon.svg";
import ArrowBottomIcon from "./assets/icons/arrow-bottom-icon.svg";
import ArrowUpIcon from "./assets/icons/arrow-up-icon.svg";
import ArrowLeftIcon from "./assets/icons/arrow-left-icon.svg";
import ArrowRightIcon from "./assets/icons/arrow-right-icon.svg";
import UserIcon from "./assets/icons/user-icon.svg";
import CheckIcon from "./assets/icons/check-icon.svg";
import LogoDiscordIcon from "./assets/icons/discord-logo-icon.svg";
import LogoLinkedInIcon from "./assets/icons/linkedin-logo-icon.svg";
import LogoTwitterIcon from "./assets/icons/twitter-logo-icon.svg";
import LogoMediumIcon from "./assets/icons/medium-logo-icon.svg";
import LogoTelegramIcon from "./assets/icons/telegram-logo-icon.svg";
import WalletIcon from "./assets/icons/wallet-icon.svg";
import OptionHorizontalDotsIcon from "./assets/icons/horizontal-three-dots-icon.svg";
import EditPenIcon from "./assets/icons/edit-pen-icon.svg";
import SwapIcon from "./assets/icons/swap-icon.svg";
import SwapVertIcon from "./assets/icons/swap-vert-icon.svg";

// Navigation
import Header from "./components/navigation/Header";
import MenuDropDown from "./components/navigation/MenuDropDown";
import ZigsBalance from "./components/navigation/Header/components/ZigsBalance";
import BrandImage from "./components/navigation/Header/components/BrandImage";

// Utils
import ThemeProvider from "./utils/ThemeProvider";
import { dark, light } from "./theme";
import { customSort } from "./utils/numbers";
import {
  createMarketPlaceTableBodyObject,
  createMarketPlaceTableHeader,
  createUserTableDataObject,
  createUserTableHeader,
} from "components/display/Table/types";

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
  ModalContainer,
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
   *   Assets
   * =-=-=-=-=-=-=-=
   */
  CloseIcon,
  CopyIcon,
  OpenArrowIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  OptionDotsIcon,
  ArrowBottomIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UserIcon,
  CheckIcon,
  LogoDiscordIcon,
  LogoLinkedInIcon,
  LogoMediumIcon,
  LogoTelegramIcon,
  LogoTwitterIcon,
  WalletIcon,
  OptionHorizontalDotsIcon,
  EditPenIcon,
  SwapIcon,
  SwapVertIcon,
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
