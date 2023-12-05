import React, { forwardRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { BackIconButton, Body, CloseIconButton, Header, Inline, Layout, Title } from "./styles";
import { ModalContainerProps } from "./types";
import { ZigBackIcon, ZigCrossIcon } from "../../../icons";

const ModalContainer = forwardRef((props: ModalContainerProps, ref) => {
  const {
    children,
    title = null,
    titleAlign = "center",
    onGoBack = null,
    width,
    onClickClose = null,
    titleStyles,
    mobileFullScreen,
  } = props;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const buttonSize = !sm && mobileFullScreen ? "22px" : "32px";

  return (
    <Layout id={"modal-container"} width={width as number} mobileFullScreen={mobileFullScreen} ref={ref} tabIndex={-1}>
      {onGoBack && typeof onGoBack === "function" && (
        <BackIconButton onClick={onGoBack}>
          <ZigBackIcon
            width={buttonSize}
            height={buttonSize}
            color={theme.palette.neutral100}
            id={"modal__back"}
          />
        </BackIconButton>
      )}
      <Header compact={!title && !onGoBack}>
        <Inline align={titleAlign}>
          {!!title && (
            <Title
              variant={mobileFullScreen && !sm ? "h2" : "h1"}
              mb={0}
              mt={mobileFullScreen && !sm ? "h2" : "h1" ? -2 : undefined}
              color="neutral100"
              id={"modal__title"}
              sx={titleStyles}
            >
              {title}
            </Title>
          )}
        </Inline>
      </Header>
      {onClickClose && typeof onClickClose === "function" && (
        <CloseIconButton onClick={onClickClose}>
          <ZigCrossIcon
            width={buttonSize}
            height={buttonSize}
            color={theme.palette.neutral100}
            id={"modal__close"}
          />
        </CloseIconButton>
      )}
      <Body mobileFullScreen={mobileFullScreen}>{children}</Body>
    </Layout>
  );
});

export { ZigModalActions, ZigModalForm } from "./styles";
export default ModalContainer;
