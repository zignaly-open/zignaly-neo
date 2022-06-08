// Dependencies
import React from "react";

// Styled Components
import { Actions } from "../styles";

// Components
import Button from "../../inputs/Button";
import Typography from "../../display/Typography";

// Assets
import ModalContainer from "../ModalContainer";

// Types
import { ErrorModalTypesProps } from "./types";

function ErrorModal({
  title,
  description,
  onClickClose,
}: ErrorModalTypesProps): React.ReactElement {
  return (
    <ModalContainer title={title} width={400} onClickClose={onClickClose}>
      <Typography variant={"body1"}>{description}</Typography>
      <Actions>
        <Button variant={"primary"} caption={"OK"} size={"large"} onClick={onClickClose} />
      </Actions>
    </ModalContainer>
  );
}

export default ErrorModal;
