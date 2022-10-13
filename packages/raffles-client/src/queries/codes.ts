import { gql } from '@apollo/client';

export const CHECK_CODE = gql`
  query checkCode($code: String!) {
    checkCode(code: $code) {
      code {
        code
        reqMinimumBalance
        reqMinimumDeposit
        reqDepositFrom
        reqMinAuctions
        reqWalletType
        benefitDirect
        maxTotalBenefits
        benefitDepositFactor
        benefitBalanceFactor
      }
      balance
      deposits
    }
  }
`;

export const GET_USER_CODES = gql`
  query userCodes {
    userCodes {
      code
      benefitDirect
      rewardDirect
      maxRedemptions
      currentRedemptions
      endDate
      rewardFactor
      maxTotalRewards
    }
  }
`;

export const GET_USER_CODES_REDEMPTIONS = gql`
  query userCodesRedemptions {
    userCodesRedemptions {
      code
      redemptionDate
      inviterBenefit
      invitedBenefit
      invited {
        shortAddress
        username
        id
      }
    }
  }
`;

export const REDEEM_CODE = gql`
  mutation redeemCode($code: String!) {
    redeemCode(code: $code)
  }
`;
