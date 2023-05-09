import React, { useCallback, useImperativeHandle, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Layout, Field, Button, ArrowIcon, DropDown } from "./styles";

import { ReactComponent as ArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";

import ZigTypography from "components/display/ZigTypography";

import { MenuDropDownProps } from "./types";

import { defaultDropDownOptions } from "./types";

// TODO: put this to ps2
// @deprecated
const MenuDropDown = (
  {
    title,
    focused = false,
    secondaryTitle = null,
    children,
    dropDownOptions,
    id,
  }: MenuDropDownProps,
  innerRef: any,
) => {
  // Ref
  const options = {
    ...defaultDropDownOptions,
    ...dropDownOptions,
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
    <Layout ref={menuRef} id={id}>
      <Button
        focused={focused}
        center={!secondaryTitle}
        isActiveDropDown={isActiveDropDown}
        onClick={handleActiveDropDown}
      >
        <Field>
          {secondaryTitle && (
            <ZigTypography variant={"caption"} component="p">
              {secondaryTitle}
            </ZigTypography>
          )}
          <ZigTypography variant={"h3"}>{title}</ZigTypography>
        </Field>
        <ArrowIcon>
          <ArrowBottomIcon />
        </ArrowIcon>
      </Button>
      {isActiveDropDown && <DropDown maxHeight={options.maxHeight}>{children}</DropDown>}
    </Layout>
  );
};

export default React.forwardRef(MenuDropDown);
