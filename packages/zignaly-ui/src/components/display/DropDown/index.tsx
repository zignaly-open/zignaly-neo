import Popover from "@mui/material/Popover";
import React, { useImperativeHandle } from "react";
import { DropDownProps, DropDownHandle, DropDownOption } from "./types";
import { Component, DropDownContainer, NavLink, NavList } from "./styles";

const DropDown: (props: DropDownProps, innerRef: React.Ref<DropDownHandle>) => JSX.Element = (
  { component, options, anchorOrigin, anchorPosition, transformOrigin }: DropDownProps,
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

  useImperativeHandle(
    innerRef,
    () => ({
      closeDropDown: () => {
        handleClose();
      },
      open,
    }),
    [anchorEl, open],
  );

  return (
    <>
      <Component onClick={handleToggle}>{component({ open })}</Component>
      {options && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={open}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              backgroundColor: "#12152c",
              whiteSpace: "nowrap",
              color: "#fff",
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: "4px 0 4px 4px",
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          <DropDownContainer>
            <NavList>
              {options.map((x) => {
                if (React.isValidElement(x)) return x;
                const option = x as DropDownOption;
                if (option.href)
                  return (
                    <NavLink active={options?.active} as={"a"} href={option.href}>
                      {option.label}
                    </NavLink>
                  );
                if (option.onClick)
                  return (
                    <NavLink
                      active={options?.active}
                      onClick={() => {
                        handleClose();
                        option.onClick!();
                      }}
                    >
                      {option.label}
                    </NavLink>
                  );
              })}
            </NavList>
          </DropDownContainer>
        </Popover>
      )}
    </>
  );
};

export default React.forwardRef(DropDown);
