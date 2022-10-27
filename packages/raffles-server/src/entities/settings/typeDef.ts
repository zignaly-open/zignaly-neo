import { gql } from 'apollo-server-express';

const settings = `
  benefitDirect: String
  reqMinimumDeposit: String
  benefitDepositFactor: String
  maxTotalBenefits: String
  rewardDirect: String
  rewardDepositFactor: String
  maxTotalRewards: String
`;

export const typeDef = gql`
  type Settings {
    ${settings}
  }

  extend type Query {
    allSettings: Settings
    Settings: Settings
  }

  extend type Mutation {
    updateSettings(${settings}): Settings
  }
`;
