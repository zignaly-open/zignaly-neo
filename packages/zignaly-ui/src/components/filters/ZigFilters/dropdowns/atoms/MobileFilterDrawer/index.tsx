import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import CheckBoxFilter from "components/filters/ZigFilters/filters/CheckBoxFilter";
import SliderFilter from "components/filters/ZigFilters/filters/SliderFilter";
import { ZigFilter } from "components/filters/ZigFilters/types";
import ZigButton from "components/inputs/ZigButton";
import React, { lazy, useCallback, useState } from "react";
const SwipeableDrawer = lazy(() => import("@mui/material/SwipeableDrawer"));

const styles = {
  accordion: {
    border: "none",
    margin: "10px 0 10px !important",
  },
  accordionSummary: {
    minHeight: "0 !important",
    ".Mui-expanded": { margin: "0 !important" },
  },
  accordionDetails: { padding: "14px 24px 2px" },
};

const MobileFilterDrawer = ({
  filters: filtersProp,
  open,
  onClose,
  onChange,
  resetFilters,
}: {
  filters: ZigFilter | ZigFilter[];
  open: boolean;
  onClose: () => void;
  resetFilters: () => void;
}) => {
  const filters = Array.isArray(filtersProp) ? filtersProp : [filtersProp];
  const [expanded, setExpanded] = useState<string | false>(
    filters.length === 1 ? filters[0].id : false,
  );

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded || filters.length === 1 ? panel : false);
  };

  const getFilterComponent = useCallback(
    (filter: ZigFilter) => {
      switch (filter.type) {
        case "slider":
          return <SliderFilter filter={filter} onChange={onChange} />;
        case "checkbox":
          return <CheckBoxFilter filter={filter} onChange={onChange} />;
        case "select":
          // todo
          return <></>;
      }
    },
    [onChange],
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={() => {}}
      disableSwipeToOpen
      onClose={onClose}
    >
      <Box p={2}>
        <Box display={"flex"} alignItems="center" mt="3px" mb="19px">
          <Box flex={1}></Box>
          <Box flex={1} justifyContent={"center"} display={"flex"}>
            <ZigTypography variant="h3">Filters</ZigTypography>
          </Box>
          <Box flex={1} justifyContent={"flex-end"} display={"flex"}>
            <ZigButton variant="text" onClick={resetFilters}>
              Reset
            </ZigButton>
          </Box>
        </Box>
        {filters.map((filter) => (
          <Accordion
            key={filter.id}
            sx={styles.accordion}
            expanded={expanded === filter.id}
            onChange={handleChange(filter.id)}
          >
            <AccordionSummary
              expandIcon={filters.length > 1 ? <ExpandMore /> : null}
              id={`accordion-filter-header-${filter.id}`}
              sx={styles.accordionSummary}
            >
              {filter.label}
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
              {getFilterComponent({ ...filter, label: "" })}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <ZigButton sx={{ alignSelf: "center", m: "8px 0 24px" }}>Show Results</ZigButton>
    </SwipeableDrawer>
  );
};

export default MobileFilterDrawer;
