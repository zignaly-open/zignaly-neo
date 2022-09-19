import Popover from "@mui/material/Popover";
import React, { useImperativeHandle } from "react";
import { DropDownProps, DropDownHandle } from "./types";
import { Component } from "./styles";

const DropDown: (props: DropDownProps, innerRef: React.Ref<DropDownHandle>) => JSX.Element = (
  { component, content, anchorOrigin, anchorPosition, transformOrigin }: DropDownProps,
  innerRef: React.Ref<DropDownHandle>,
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(innerRef, () => ({
    closeDropDown: () => {
      handleClose();
    },
  }));

  return (
    <>
      <Component onClick={handleToggle}>{component}</Component>
      {content && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "#12152c",
              whiteSpace: "nowrap",
              color: "#fff",
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: "4px 0 4px 4px",
              overflow: "hidden",
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          {content}
        </Popover>
      )}
    </>
  );
};

export default React.forwardRef(DropDown);
