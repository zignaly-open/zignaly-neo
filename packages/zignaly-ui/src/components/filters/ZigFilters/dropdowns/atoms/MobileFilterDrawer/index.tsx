import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import ZigButton from "components/inputs/ZigButton";
import React, { lazy, useState } from "react";
import { MobileFilterDrawerProps } from "./type";
import Filter from "components/filters/ZigFilters/filters/Filter";
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
  prefixId,
}: MobileFilterDrawerProps) => {
  const isMulti = Array.isArray(filtersProp);
  const filters = isMulti ? filtersProp : [filtersProp];
  const [expanded, setExpanded] = useState<string | false>(
    filters.length === 1 ? filters[0].id : false,
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
            <ZigTypography variant="h3">{isMulti ? "Filters" : filters[0].label}</ZigTypography>
          </Box>
          <Box flex={1} justifyContent={"flex-end"} display={"flex"}>
            <ZigButton variant="text" onClick={resetFilters} id={`${prefixId}__dropdown-reset`}>
              Reset
            </ZigButton>
          </Box>
        </Box>
        {filters.map((filter) => (
          <Accordion
            key={filter.id}
            sx={styles.accordion}
            expanded={expanded === filter.id}
            onChange={(_, isExpanded) =>
              setExpanded(isExpanded || filters.length === 1 ? filter.id : false)
            }
          >
            <AccordionSummary
              expandIcon={filters.length > 1 ? <ExpandMore sx={{ color: "neutral200" }} /> : null}
              id={`${prefixId}__accordion-filter-header-${filter.id}`}
              sx={styles.accordionSummary}
            >
              {isMulti ? filter.label : ""}
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetails}>
              <Filter filter={{ ...filter, label: "" }} mobile={true} onChange={onChange} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <ZigButton
        onClick={onClose}
        sx={{ alignSelf: "center", m: "8px 0 24px" }}
        id={`${prefixId}____multi-dropdown-show`}
      >
        Show Results
      </ZigButton>
    </SwipeableDrawer>
  );
};

export default MobileFilterDrawer;
