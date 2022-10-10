import React from "react";

import { Actions } from "../styles";

import Button from "../../inputs/Button";
import Typography from "../../display/Typography";

import ModalContainer from "../ModalContainer";

import { MessageModalTypesProps } from "./types";

function MessageModal({
  title,
  description,
  width = 400,
  onClickClose = () => {},
}: MessageModalTypesProps): React.ReactElement {
  return (
    <ModalContainer title={title} width={width} onClickClose={onClickClose}>
      <Typography variant={"body1"} color="neutral200" weight="regular">
        {description}
      </Typography>
      <Actions>
        <Button variant={"primary"} caption={"OK"} size={"large"} onClick={onClickClose} />
      </Actions>
    </ModalContainer>
  );
}

export default MessageModal;
