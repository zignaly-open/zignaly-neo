import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Setting {
    key: ID
    value: String
  }

  extend type Query {
    allSettings: [Setting]
  }

  extend type Mutation {
    updateSetting(id: ID, value: String): Setting
  }
`;
