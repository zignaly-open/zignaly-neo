import Menu from "@mui/material/Menu";
import React, { useImperativeHandle } from "react";
import { Layout, ViewPort, Icon, Container, ButtonLoader, IconContainer } from "./styles";
import { DropdownHandle, DropdownProps } from "./types";
import { LoaderTypes } from "components/display/Loader";

const IconButton: (props: DropdownProps, innerRef: React.Ref<DropdownHandle>) => JSX.Element = (
  {
    shrinkWrap,
    icon,
    disabled = false,
    size = "medium",
    variant = "primary",
    onClick = null,
    loading = false,
    renderDropDown = null,
    colors = {
      normal: "#706f82",
      active: "#fff",
    },
    className,
    type,
  }: DropdownProps,
  innerRef: React.Ref<DropdownHandle>,
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    return disabled ? () => {} : renderDropDown ? handleClick : onClick;
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
    <Layout className={className}>
      <ViewPort
        shrinkWrap={shrinkWrap}
        type={type}
        size={size}
        variant={variant}
        colors={colors}
        disabled={disabled || loading}
        isActiveDropdown={!!anchorEl}
      >
        <Container onClick={handleClick}>
          {loading ? (
            <ButtonLoader type={LoaderTypes.TAILSPIN} color="#9CA3AF" ariaLabel="Loader" />
          ) : (
            <IconContainer>
              <Icon>{icon}</Icon>
            </IconContainer>
          )}
        </Container>
      </ViewPort>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
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
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {renderDropDown}
      </Menu>
    </Layout>
  );
};

export default React.forwardRef(IconButton);
