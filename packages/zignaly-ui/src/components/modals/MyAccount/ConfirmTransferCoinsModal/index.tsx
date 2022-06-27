import Typography from "components/display/Typography";
import Button from "components/inputs/Button";
import ModalContainer from "components/modals/ModalContainer";
import React from "react";
import { Column } from "utils/column";
import { Gap } from "utils/gap";

const ConfirmTransferCoinsModal = ({
  viewDAndWOnClick = () => {},
  onClickClose = () => {},
}: {
  viewDAndWOnClick: Function;
  onClickClose: Function;
}) => {
  return (
    <ModalContainer title={"Transfer Complete"} onClickClose={onClickClose}>
      <Gap gap={16} />
      <Typography variant="body1">
        Your transfer can take a few minutes to appear in your other account. Please check your
        Deposits & Withdrawals page for the latest status.
      </Typography>
      <Gap gap={28} />
      <Column width="319px">
        <Button
          caption="View Deposits & Withdrawals"
          size="xlarge"
          onClick={() => viewDAndWOnClick}
        />
      </Column>
    </ModalContainer>
  );
};

export default ConfirmTransferCoinsModal;
