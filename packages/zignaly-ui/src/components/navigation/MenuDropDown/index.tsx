import React, { useCallback, useImperativeHandle, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Layout, Field, Button, ArrowIcon, DropDown } from "./styles";

import { ReactComponent as ArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";

import ZigTypography from "components/display/ZigTypography";

import { MenuDropDownProps } from "./types";

import { defaultDropDownStyle } from "./types";

// TODO: put this to ps2
// @deprecated
const MenuDropDown = (
  {
    title,
    focused = false,
    secondaryTitle = null,
    children,
    dropDownStyle,
    id,
    className,
  }: MenuDropDownProps,
  innerRef: any,
) => {
  // Ref
  const style = {
    ...defaultDropDownStyle,
    ...dropDownStyle,
  };
  const menuRef = useRef(null);

  const [isActiveDropDown, setActiveDropDown] = useState(false);

  /**
   * @function handleActiveDropDown():
   * @description Toggle Active DropDown functionality
   */
  const handleActiveDropDown = useCallback(() => {
    setActiveDropDown((active) => !active);
  }, []);

  useClickAway(menuRef, () => {
    setActiveDropDown(false);
  });

  useImperativeHandle(innerRef, () => ({
    setIsDropDownActive: (isActive: boolean) => {
      setActiveDropDown(isActive);
    },
  }));

  return (
    <Layout ref={menuRef} id={id} className={className}>
      <Button
        focused={focused}
        center={!secondaryTitle}
        isActiveDropDown={isActiveDropDown}
        onClick={handleActiveDropDown}
      >
        <Field>
          {secondaryTitle && (
            <ZigTypography color="neutral400" variant={"caption"} component="p">
              {secondaryTitle}
            </ZigTypography>
          )}
          <ZigTypography
            sx={{
              fontWeight: 400,
              color: (theme) =>
                !secondaryTitle
                  ? theme.palette.neutral300
                  : `${theme.palette.neutral100} !important`,
            }}
            fontWeight={400}
            variant={"h3"}
            component="span"
          >
            {title}
          </ZigTypography>
        </Field>
        <ArrowIcon>
          <ArrowBottomIcon />
        </ArrowIcon>
      </Button>
      {isActiveDropDown && <DropDown style={style}>{children}</DropDown>}
    </Layout>
  );
};

export default React.forwardRef(MenuDropDown);
