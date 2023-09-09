import React, { forwardRef } from "react";
import { useTheme } from "@mui/material";
import {
  Layout,
  Header,
  Title,
  Body,
  Inline,
  CloseIconButton,
  BackIconButton,
} from './styles';
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
  } = props;
  const theme = useTheme();

  return (
    <Layout width={width as number} ref={ref} tabIndex={-1}>
      {onGoBack && typeof onGoBack === "function" && (
        <BackIconButton onClick={onGoBack}>
          <ZigBackIcon
            width={"32px"}
            height={"32px"}
            color={theme.palette.neutral100}
            id={"modal__back"}
          />
        </BackIconButton>
      )}
      <Header compact={!title && !onGoBack}>
        <Inline align={titleAlign}>
          {!!title && (
            <Title
              variant="h1"
              mb={0}
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
            width={"32px"}
            height={"32px"}
            color={theme.palette.neutral100}
            id={"modal__close"}
          />
        </CloseIconButton>
      )}
      <Body>{children}</Body>
    </Layout>
  );
});

export { ZigModalActions, ZigModalForm } from "./styles";
export default ModalContainer;
