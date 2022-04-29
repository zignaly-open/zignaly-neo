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

// Inputs
import Button from "./components/inputs/Button";
import CheckBox from "./components/inputs/CheckBox";
import IconButton from "./components/inputs/IconButton";
import InputAmount from "./components/inputs/InputAmount";
import TextButton from "./components/inputs/TextButton";
import InputText from "./components/inputs/InputText";
import Select from "./components/inputs/Selector";
import { ButtonGroup } from "./components/styled";

// Icons
import CloseIcon from "./assets/icons/close-icon.svg";
import CopyIcon from "./assets/icons/close-icon.svg";

// Navigation
import Tabs from "./components/navigation/Tabs";
import TabPanel from "./components/navigation/Tabs/components/TabPanel";
import Tab from "./components/navigation/Tabs/components/Tab";
import ThemeProvider from "./utils/ThemeProvider";
import { dark, light } from "./theme";

export {
  /**
   * =-=-=-=-=-=-=-=
   *   Components
   * =-=-=-=-=-=-=-=
   */

  // Display
  Avatar,
  Loader,
  Table,
  ConnectionStateLabel,
  DateLabel,
  PriceLabel,
  PercentageIndicator,
  Typography,
  ErrorMessage,
  ZigWalletIndicator,
  CoinLabel,
  // Inputs
  Button,
  CheckBox,
  IconButton,
  InputAmount,
  TextButton,
  InputText,
  Select,
  ButtonGroup,
  // Icons
  CloseIcon,
  CopyIcon,
  // Navigation
  Tabs,
  TabPanel,
  Tab,
  ThemeProvider,
  dark,
  light,
};
