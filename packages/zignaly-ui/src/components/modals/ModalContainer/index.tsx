// Dependencies
import React, { useMemo } from "react";

// Styled Components
import { Layout, Header, Title, Body, HeaderButton, Inline } from "./styles";

// Assets
import CloseIcon from "assets/icons/close-icon.svg";
import ArrowLeftIcon from "assets/icons/arrow-left-icon.svg";

// Types
import { ModalContainerProps } from "./types";

function ModalContainer({
  width = "large",
  onClose,
  children,
  title = null,
  customHeaderAction = null,
  onGoBack = null,
}: ModalContainerProps) {
  const renderHeaderAction = useMemo(
    () =>
      !customHeaderAction ? (
        <HeaderButton onClick={onClose}>
          <CloseIcon />
        </HeaderButton>
      ) : (
        customHeaderAction
      ),
    [customHeaderAction],
  );

  return (
    <Layout width={width}>
      <Header>
        <Inline>
          {onGoBack && typeof onGoBack === "function" && (
            <HeaderButton onClick={onGoBack}>
              <ArrowLeftIcon color={"#fff"} />
            </HeaderButton>
          )}
          <Title>{title}</Title>
        </Inline>
        {renderHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
