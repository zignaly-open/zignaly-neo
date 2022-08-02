export interface AccountSettingsModalProps {
  type: "Spot" | "Future";
  exchange: string;
  accountName: string;
  enableLeveragedToken: Function;
  generateOnClick: Function;
  saveSettingsOnClick: Function;
  onClickClose: Function;
  deleteGeneratedKeyOnClick: Function;
  onClickConfirmDelete: Function;
}

export const accountSettingsViewsId = {
  API_KEY: "api-key",
  EDIT_ACCOUNT: "edit-account",
  DELETE_ACCOUNT: "delete-account",
};
