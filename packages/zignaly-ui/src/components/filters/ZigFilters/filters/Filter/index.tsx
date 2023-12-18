import React from "react";
import { FilterProps } from "./type";
import CheckBoxFilter from "../CheckBoxFilter";
import SelectFilter from "../SelectFilter";
import SliderFilter from "../SliderFilter";

const Filter = ({ filter, onChange, mobile }: FilterProps) => {
  switch (filter.type) {
    case "slider":
      return <SliderFilter filter={filter} onChange={onChange} mobile={mobile} />;
    case "checkbox":
      return <CheckBoxFilter filter={filter} onChange={onChange} mobile={mobile} />;
    case "select":
      return <SelectFilter filter={filter} onChange={onChange} mobile={mobile} />;
  }
};

export default Filter;
