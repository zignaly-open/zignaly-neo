import { CheckboxFilter, SelectFilter, SliderFilter, ZigFiltersType } from "../types";

export const returnsFilter: SliderFilter = {
  type: "slider",
  value: [19, 100],
  label: "6 months returns",
  allowNoMin: true,
  allowNoMax: true,
  min: 0,
  max: 100,
  id: "returns",
  primary: true,
};

export const coinFilter: SelectFilter = {
  type: "select",
  label: "Coin",
  options: [
    { value: null, label: "All" },
    { value: "USDT", label: "USDT" },
    { value: "USDC", label: "USDC" },
  ],
  id: "coin",
  value: null,
  primary: true,
};

export const typeFilter: CheckboxFilter = {
  type: "checkbox",
  label: "Type",
  options: [
    { value: "spot", label: "Spot" },
    { value: "futures", label: "Futures" },
    { value: "test", label: "Test" },
  ],
  id: "type",
  value: ["spot", "futures"],
};

export const filters: ZigFiltersType = [returnsFilter, coinFilter, typeFilter];
