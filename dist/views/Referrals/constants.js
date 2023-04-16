export var RewardType;
(function (RewardType) {
    RewardType["SIGNUP_REWARD"] = "SIGNUP_REWARD";
    RewardType["DEPOSIT_REWARD"] = "DEPOSIT_REWARD";
    RewardType["SUCCESS_REWARD"] = "SUCCESS_REWARD";
    RewardType["ALLOCATE_REWARD"] = "ALLOCATE_REWARD";
    RewardType["SUCCESS_FEE_REWARD"] = "SUCCESS_FEE_REWARD";
    RewardType["REBATE_COMMISSION_REWARD"] = "REBATE_COMMISSION_REWARD";
})(RewardType || (RewardType = {}));
export var StatusType;
(function (StatusType) {
    StatusType["Completed"] = "Completed";
    StatusType["Pending"] = "Pending";
    StatusType["Locked"] = "Locked";
    StatusType["TransferPending"] = "Transfer pending";
    StatusType["TransferOrdered"] = "Transfer ordered";
    StatusType["Cancelled"] = "Cancelled";
    StatusType["Failed"] = "Failed";
})(StatusType || (StatusType = {}));
export var hardcodedInviteeReward = {
    value: 20,
    coin: 'ZIG',
    threshold: 100,
};
//# sourceMappingURL=constants.js.map