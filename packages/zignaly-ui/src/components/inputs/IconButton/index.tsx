import React from "react";
import { Layout, ViewPort, Icon, Container, ButtonLoader, IconContainer } from "./styles";
import { IconButtonProps } from "./types";
import { LoaderTypes } from "components/display/Loader";

// TODO: figure out what to do with this
const IconButton = ({
  shrinkWrap,
  icon,
  disabled = false,
  size = "medium",
  variant = "primary",
  onClick,
  loading = false,
  colors = {
    normal: "#706f82",
    active: "#fff",
  },
  isFocused = false,
  className,
  type = "button",
  id,
}: IconButtonProps): JSX.Element => {
  return (
    <Layout className={className}>
      <ViewPort
        id={id}
        shrinkWrap={shrinkWrap}
        type={type}
        size={size}
        variant={variant}
        colors={colors}
        onClick={onClick}
        disabled={disabled || loading}
        isFocused={isFocused}
      >
        <Container>
          {loading ? (
            <ButtonLoader type={LoaderTypes.TAILSPIN} color="#9CA3AF" ariaLabel="Loader" />
          ) : (
            <IconContainer>
              <Icon>{icon}</Icon>
            </IconContainer>
          )}
        </Container>
      </ViewPort>
    </Layout>
  );
};

export default IconButton;
